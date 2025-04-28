'use server'
import User from "@/models/User";
import UserType from "@/Types/UserType";
import convertToSerializableObject from "@/utils/convertToObj";
import { getSessionUser } from "@/utils/getSessionuser";

const findUserById = async () => {
  const sessionUser = await getSessionUser();
  console.log('sessionUser: ', sessionUser);
  const userDoc = await User.findById(sessionUser?.userId) as UserType;
  console.log('userDoc: ', userDoc);
  const user = convertToSerializableObject(userDoc)
  console.log('user: ', user);
  return user
}

export default findUserById;
