import mongoose from "mongoose";

interface UserType {
  email: string,
  username: string,
  image: string,
  bookmarks: mongoose.Types.ObjectId[]
}

export default UserType
