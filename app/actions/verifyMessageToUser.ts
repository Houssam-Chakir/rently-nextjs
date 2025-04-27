import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionuser";

const verifyMessageToUser = async (messageId) => {
  let status = "verified";
  // Get the session user
  const sessionUser = await getSessionUser();
  // Check if the user session exists
  if (!sessionUser) {
    throw new Error("User session not found");
  }
  // Extract the user ID from the session
  const { userId } = sessionUser;
  // Find the message by its ID
  const message = await Message.findById(messageId);

  // Check if the message exists
  if (!message || message.recipient.toString() !== userId) {
    status = "unverified";
    // throw new Error("Message not found");
    return {message: null, status}
  }

  return { message, status };
};

export default verifyMessageToUser;
