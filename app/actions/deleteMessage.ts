"use server";

import connectDB from "@/config/database";
import { revalidatePath } from "next/cache";
import verifyMessageToUser from "./verifyMessageToUser";

export default async function deleteMessage(messageId) {
  await connectDB();
  const { message, status } = await verifyMessageToUser(messageId);

  if (status !== "verified" || !message) {
    throw new Error("Message may not exist anymore");
  }

  await message.deleteOne()

  revalidatePath("/messages", "layout");
  return true
}
