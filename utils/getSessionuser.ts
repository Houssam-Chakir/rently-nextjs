import { getServerSession } from "next-auth/next";
import authOptions from "./authOptions";

/**
 * Retrieves the current session user from the server.
 *
 * @async
 * @function
 * @returns {Promise<{ user: { email: string; id: string; name: string; image: string }; userId: string } | null>}
 * Returns an object containing the session user and their user ID if a session exists, or `null` if no session is found.
 */
export const getSessionUser = async () => {
  // Attempt to retrieve the session using getServerSession and authOptions.
  const session = await getServerSession(authOptions) as { user: { email: string; id: string, name: string, image:string } };
  // If no session exists or the session doesn't contain user information, return null.
  if (!session || !session.user) return null;

  // If a session and user are found, return an object containing the user and their ID.
  return {
    user: session.user,
    userId: session.user.id,
  };
};
