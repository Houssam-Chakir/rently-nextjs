"use client";

import bookmarkProperty from "@/app/actions/BookmarkProperty";
import { FaBookmark } from "react-icons/fa";
import { toast } from "react-toastify";

const BookmarkButton = ({ property, isBookmarked }) => {
  async function handleBookmarkProperty() {
    // Call the bookmarkProperty action to bookmark or unbookmark the property.
    const res = await bookmarkProperty(property._id, isBookmarked);
    // If there is an error, display an error toast.
    if (res.error) toast.error(res.error);
    // Display a success toast with the message from the response.
    toast.success(res.message);
  }

  return (
    <button onClick={handleBookmarkProperty} className={`${!isBookmarked ? 'bg-blue-500 hover:bg-blue-600' : 'bg-red-500 hover:bg-red-600'}  text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center`}>
      <FaBookmark className='mr-2'></FaBookmark> {isBookmarked ? "Remove from bookmarks" : "Bookmark Property"}
    </button>
  );
};

export default BookmarkButton;
