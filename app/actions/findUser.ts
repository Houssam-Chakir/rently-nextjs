'use server'
import User from "@/models/User";
import UserType from "@/Types/UserType";
import convertToSerializableObject from "@/utils/convertToObj";
import { getSessionUser } from "@/utils/getSessionuser";

const findUserById = async () => {
  const sessionUser = await getSessionUser();
  const userDoc = await User.findById(sessionUser?.userId) as UserType;
  const user = convertToSerializableObject(userDoc)
  return user
}

export default findUserById;
