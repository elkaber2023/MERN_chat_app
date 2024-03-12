import React, { useEffect } from "react";
import { useSocketContext } from "../Context/SocketContext";
import useConversation from "../Zustand/useConversation.js";

import notificationSound from "../assets/Sounds/notification.mp3";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();
  // console.log("useListenMessages > messages => ",messages);
  // console.log("useListenMessages > messages => messages.data",messages.data[0].message);
  // console.log("useListenMessages > messages => ...messages",messages);

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      newMessage.shouldShake = true;
      const sound = new Audio(notificationSound);
      sound.play();
      setMessages([...messages, newMessage]);

      console.log("useListenMessages => ", newMessage);
    });
    return () => socket?.off("newMessage");
  }, [socket, setMessages, messages]);
};
export default useListenMessages;
