import express, { Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import authRouter from "./routes/authRouter";
import userRouter from "./routes/userRouter";
import messageRouter from "./routes/messageRouter";
import cors from "cors";
import http from "http";
import socketIo, { Socket, Server } from "socket.io";
import { IMessage } from "./models/messageSchema";
import { createMessage } from "./controller/message";

// configures dotenv to work in your application
dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
connectDB();

const PORT = process.env.PORT;

app.use(cors({ origin: "*" }));
app.use(express.json());
app.get("/", (request: any, response: any) => {
  response.status(200).send("hello vinay is creating socket");
});
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/message", messageRouter);

type OnlineUser = {
  [key: string]: Socket;
};
export var onlineUsers: any = [];

io.on("connection", (socket: Socket) => {
  // socket.on(
  //   "privareMessage",
  //   async ({ sender: senderId, receiver: receiverId, content }: IMessage) => {
  //     const receiverSocket = Array.from(io.sockets.sockets.values()).find(
  //       //@ts-ignore
  //       (s) => s?.userId === receiverId
  //     );
  //     if (receiverSocket) {
  //       receiverSocket.emit("receiveMessage", content);
  //     }
  //   }
  // );

  // socket.on

  socket.on("setUserId", (userId: string) => {
    //@ts-ignore
    socket.userId = userId;
    onlineUsers[userId] = socket.id;
    console.log("onlineusers", onlineUsers);
  });

  socket.on("sendMessage", async (message: IMessage) => {
    try {
      const newMessage = await createMessage(message);
      const senderSocketId = onlineUsers[message.sender.toString()];
      const receiverSocketId = onlineUsers[message.receiver.toString()];

      if (senderSocketId) {
        io.to(senderSocketId).emit("newMessage", newMessage);
      }
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", newMessage);
      }
    } catch (error) {
      console.error("Error in sendMessage:", error);
      socket.emit("error", "Failed to send message");
    }
  });

  socket.on("disconnect", () => {
    //@ts-ignore
    if (socket?.userId) {
      //@ts-ignore
      delete onlineUsers[socket?.userId];
      //@ts-ignore
      console.log("User disconnected:", socket?.userId);
    }
  });
});

server
  .listen(PORT, () => {
    console.log("Server running at PORT: ", PORT);
  })
  .on("error", (error: any) => {
    // gracefully handle error
    throw new Error(error.message);
  });
