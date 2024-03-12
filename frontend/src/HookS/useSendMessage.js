import React, { useState } from "react";
import useConversation from "../Zustand/useConversation.js";
import toast from "react-hot-toast";
import { useAuthContext } from "../Context/AuthContext.jsx";


const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const { authUser } = useAuthContext();

  const sendMessage = async (message) => {
    console.log("From HOOKS sendMessage => ", message);
    setLoading(true);
    try {
      const myHeader = new Headers();
      myHeader.append("Content-Type", "application/json");
      myHeader.append("Authorization", `Bearer ${authUser?.token}`);
      // console.log("selectedConversation",selectedConversation);
      const res = await fetch(
        `http://localhost:8140/api/messages/send/${selectedConversation?._id}`,
        {
          method: "POST",
          headers: myHeader,
          body: JSON.stringify({message}),
        }
      );
      const data = await res?.json();
      if (data?.error) {
        console.log("Error From useSendMessage => ", data?.error);
        toast.error(data?.error);
        return;
      }
      console.log("Fetch Send > data => ",data);
      setMessages( [...messages, data] );
      console.log("Fetch Send > setMessages > data => ",messages);
      
    } catch (error) {
      console.log("Error From HOOKS>useSendMessage>", error?.message);
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, sendMessage };
};

export default useSendMessage;
