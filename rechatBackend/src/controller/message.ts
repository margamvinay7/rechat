import Message, { IMessage, validateMessage } from "../models/messageSchema";
import { Request, Response } from "express";

export const getMessages = async (req: Request, res: Response) => {
  const { sender: senderId, receiver: receiverId } = req.query;
  console.log("messages", senderId, receiverId);
  try {
    const messages = await Message.find({
      $or: [
        { sender: senderId, receiver: receiverId },
        { sender: receiverId, receiver: senderId },
      ],
    })
      .sort({ createdAt: 1 })
      .exec();

    res.status(201).json({ messages: messages });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const createMessage = async (message: IMessage) => {
  try {
    validateMessage(message);
    const newMessage = new Message(message);
    await newMessage.save();

    return newMessage;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};
