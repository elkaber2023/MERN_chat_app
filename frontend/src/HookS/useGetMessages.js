import React, { useEffect, useState } from "react";
import useConversation from "../Zustand/useConversation";
import toast from "react-hot-toast";
import { useAuthContext } from "../Context/AuthContext";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const { authUser } = useAuthContext();
  // console.log("selectedConversation=> ",selectedConversation);
  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const myHeaders = new Headers();
        // myHeaders.append("Content-Type", "application/json");
        // myHeaders.append("AccessControlAllowPrivateNetwork",true);
        myHeaders.append("Authorization", `Bearer ${authUser?.token}`);
        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        };
        const res = await fetch(
          `http://localhost:5000/api/messages/${selectedConversation?._id}`,
          requestOptions
        );

        const data = await res?.json();
        if (data.error) {
          console.log("Data Error From HOOKS => useGetMessages: ", data?.error);
          return;
        }
        console.log("useGetMessages=> Fetch <<<data",data); //Data Object in Array
        setMessages(data);
        console.log("useGetMessages=> messages <<<setMessages => ",messages); //[]
      } catch (error) {
        console.log(
          "Catch Error From HOOKS => useGetMessages: ",
          error?.message

        );
        toast.error(error?.message);
        return;
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) {
      getMessages();
    }
  }, [selectedConversation?._id, setMessages]);

  return { messages, loading };
};

export default useGetMessages;
