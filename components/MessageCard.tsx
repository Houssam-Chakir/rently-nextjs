"use client";

import deleteMessage from "@/app/actions/deleteMessage";
import MarkMessageAsRead from "@/app/actions/MarkMessageAsRead";
import { useGlobalContext } from "@/context/GlobalContext";
import { useState } from "react";
import { toast } from "react-toastify";

const MessageCard = ({ message }) => {
  const [isRead, setIsRead] = useState(message.read);

  const { setUnreadCount }= useGlobalContext();

  const handleMarkAsRead = async () => {
    const status = await MarkMessageAsRead(message._id);
    if (setUnreadCount) setUnreadCount((prev) =>  status ? prev - 1 : prev + 1);
    setIsRead(status);
    toast.success(`Message marked as ${isRead ? "read" : "new"}`);
  };

  const handleDeleteMessage = async () => {
    if (confirm("are you sure you want to delete this message")) {
      await deleteMessage(message._id);
      if (setUnreadCount) setUnreadCount(prev => prev -1)
      toast.success("Message deleted successfuly");
    } else toast.warning("Something went wrong deleting the message!");
  };

  return (
    <div className='relative bg-white p-4 rouneded-md shadow-md border border-gray-200'>
      {!isRead && <div className='absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md'>New</div>}
      <h2 className='text-xl mb-4'>
        <span className='font-bold'>Property Inquiry:</span> {message.property.name}
      </h2>
      <p className='text-gray-700'>{message.body}</p>
      <ul className='mt-4'>
        <li>
          <strong>Replay Email:</strong>{" "}
          <a href={`mailto:${message.email}`} className='text-blue-500'>
            {message.email}
          </a>
        </li>
        <li>
          <strong>Replay Phone:</strong>{" "}
          <a href={`tel:${message.phone}`} className='text-blue-500'>
            {message.phone}
          </a>
        </li>
        <li>
          <strong>Received:</strong> {new Date(message.createdAt).toLocaleString()}
        </li>
      </ul>
      <button onClick={handleMarkAsRead} className='mt-4 mr-3 bg-blue-500 text-white py-1 px-3 rounded-md'>
        Mark as {isRead ? "new" : "read"}
      </button>
      <button onClick={handleDeleteMessage} className='mt-4 mr-3 bg-red-500 text-white py-1 px-3 rounded-md'>
        Delete
      </button>
    </div>
  );
};

export default MessageCard;
