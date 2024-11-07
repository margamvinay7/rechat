"use client";

import { Sidebar } from "@/components/sidebar";
import { ChatWindow } from "@/components/chatwindow";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

export default function Chat() {
  const [selectedUser, setSelectedUser] = useState({});

  const handleUserSelect = (user: any) => {
    setSelectedUser(user);
  };
  useEffect(() => {
    const user: string | null = localStorage.getItem("user");
    console.log("user", user);
    if (user) {
      socket.on("connect", () => {
        console.log("connection");
      });
      socket.emit("setUserId", JSON.parse(user)?.id);
    }
  }, []);
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar socket={socket} onUserSelect={handleUserSelect} />
      <ChatWindow socket={socket} selectedUser={selectedUser} />
    </div>
  );
}
