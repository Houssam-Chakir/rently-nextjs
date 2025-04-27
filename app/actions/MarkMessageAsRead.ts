'use server'

import connectDB from "@/config/database";
import { revalidatePath } from "next/cache";
import verifyMessageToUser from "./verifyMessageToUser";

const MarkMessageAsRead = async (messageId) => {
  await connectDB();
  const {message, status} = await verifyMessageToUser(messageId)

  if (status !== 'verified' || !message) {
    throw new Error("Message may not exist anymore")
  }
  // Toggle the read status of the message
  message.read = !message.read;
  message.save()
  // Invalidate the cache for the messages page
  revalidatePath("/messages", "page");

  // Return the updated read status
  return message.read;
};

export default MarkMessageAsRead;
