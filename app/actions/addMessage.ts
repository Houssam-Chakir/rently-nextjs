"use server";

import connectDB from "@/config/database";
import Message from "@/models/Message";
import verifySession from "@/utils/verifySession";


export default async function addMessage(previousState,formData: FormData) {
  await connectDB();
  const userId = await verifySession()

  const recipient = formData.get('recipient')

  if (userId === recipient) {
    return {error: 'You cannot send a message to yourself'}
  }

  const newMessage = new Message({
    sender: userId,
    recipient,
    property: formData.get('property'),
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    body: formData.get('message'),
  })

  await newMessage.save()

  return {submitted: true}

}
