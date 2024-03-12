// STARTER CODE SNIPPET
import useGetConversations from "../../HookS/useGetConversations";
import { getRandomEmoji } from "../../utils/emojis";

import Conversation from "./Conversation";

const Conversations = () => {
  const { loading, conversations } = useGetConversations();
  // console.log("CONVERSATIONS => ", conversations);
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversation, idx) => {
        // console.log("conversation",conversation);
        // console.log("idx",idx);
        return <Conversation
          key={conversation._id}
          conversation={conversation}
          emojis={getRandomEmoji()}
          lastIdx={idx === conversation.length - 1}
        />;
      })}

      {/* {!loading ? <span className="loading loading-spinner"></span> : "Sign Up"} */}
    </div>
  );
};
export default Conversations;
