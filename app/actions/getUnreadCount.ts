"use server";

import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionuser";

const getUnreadCount = async () => {
  await connectDB();
  const sessionUser = await getSessionUser();
  // Check if the user session exists
  if (!sessionUser) {
    throw new Error("User session not found");
  }
  // Extract the user ID from the session
  const { userId } = sessionUser;

  const count = await Message.countDocuments({
    recipient: userId,
    read: false,
  });

  return { count };
};

export default getUnreadCount;
