import Conversation from "../Models/conversation.model.js";
import Message from "../Models/message.model.js";
import { getReceiverSocketId, io } from "../Socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    console.log("receiverId=> ", receiverId);

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    // await conversation.save();
    // await newMessage.save();

    //this will be run in parallel
    await Promise.all([conversation.save(), newMessage.save()]);

    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
      
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error In sendMessage Controller: ", error);
    return res.status(500).json("Internal server error");
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;
    console.log("Controller getMessage, userToChatId ", userToChatId);
    console.log("Controller getMessage, senderId ", senderId);

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");

    if (!conversation) return res.status(200).json([]);

    const messages = conversation.messages;

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error In getMessage Controller: ", error.message);
    return res.status(500).json("Internal server error");
  }
};
