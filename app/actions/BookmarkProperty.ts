"use server";

import connectDB from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionuser";
import { revalidatePath } from "next/cache";

const bookmarkProperty = async (propertyId, isBookmarked) => {
  let message = "";
  let error: string | null = null
  // Connect to the database
  await connectDB;
  // Get the session user
  const sessionUser = await getSessionUser();

  // Check if the user is logged in
  if (!sessionUser || !sessionUser?.userId) {
    error = "You need to be logged in for this action"
    throw new Error("You need to be logged in for this action");
  }

  // Find the user in the database
  const user = await User.findById(sessionUser.userId);
  // Check if the property is already bookmarked

  // If the property is bookmarked, remove it from the bookmarks array
  if (isBookmarked) {
    user.bookmarks.pull(propertyId);
    isBookmarked = false;
    message = "Bookmark removed";
  } else {
    // If the property is not bookmarked, add it to the bookmarks array
    user.bookmarks.push(propertyId);
    isBookmarked = true;
    message = "Property bookmarked";
  }
  // Save the user to the database
  user.save();
  // Revalidate the saved properties page
  revalidatePath("/properties/saved", "page");

  // Return the new bookmark status and message
  return { message, error };
};

export default bookmarkProperty;
