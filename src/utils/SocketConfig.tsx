"use client";

import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";


export function useSocket() {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_API_URL as string, {
      transports: ["websocket"],
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("✅ Connected:", socket.id);

     
    });

    socket.on("disconnect", () => {
      console.log("❌ Disconnected:", socket.id);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return socketRef;
}
