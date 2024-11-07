"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Chat from "./chat/page";
import Login from "./login/page";

export default function App() {
  let user: string | null = null;
  const router = useRouter();
  useEffect(() => {
    user = localStorage.getItem("user");

    console.log("user", user);
    if (user) {
      user = JSON.parse(user);
      router.push("/chat");
    } else {
      router.push("/login");
    }
  }, []);

  return (
    <>
      <Login />
    </>
  );
}
