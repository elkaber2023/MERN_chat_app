// STARTER CODE SNIPPET
import { useEffect, useRef } from "react";
import useGetMessages from "../../HookS/useGetMessages.js";
import MessageSkeleton from "../Skeleton/MessageSkeleton.jsx";
import Message from "./Message.jsx";
import useListenMessages from "../../HookS/useListenMessages.js";

const Messages = () => {
  const { messages, loading } = useGetMessages();

  useListenMessages();
  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);
  // console.log("Component Messages => ",messages);
  // console.log("Component Messages => messages.data",messages.data);

  // let msgs = messages.data;
  // console.log("Component Messages msgs=> ", msgs);
  // console.log("Component Messages loading=> ", loading);
  return (
    <div className="px-4 flex-1 overflow-auto">

      {!loading &&
        messages.length > 0 &&
        messages.map((message) => {
          return (
            <div key={message._id} ref={lastMessageRef}>
              <Message message={message} />
            </div>
          );
        })}

      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

      {!loading && messages.length === 0 && (
        <p className="text-center">Send a message to start the conversation</p>
      )}
    </div>
  );
};
export default Messages;
