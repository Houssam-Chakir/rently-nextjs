import UserType from "@/Types/UserType";
import { model, models, Schema } from "mongoose";


const UserSchema = new Schema<UserType>({
  email: {
    type: String,
    unique: [true, 'Email already exists'],
    required: [true, 'Email is required'],
  },
  username: {
    type: String,
    required: [true, 'username is required'],
  },
  image: {
    type: String,
  },
  bookmarks: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Property',
    }
  ]
}, {
  timestamps: true,
})

const User = models.User || model('User', UserSchema)

export default User
