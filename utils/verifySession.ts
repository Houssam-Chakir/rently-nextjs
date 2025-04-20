import { getSessionUser } from "./getSessionuser";

const verifySession = async () => {
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) throw new Error("User ID is required");
  const { userId } = sessionUser;

  return userId
};

export default verifySession;
