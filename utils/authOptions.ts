import connectDB from "@/config/database";
import User from "@/models/User";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";

/**
 * Configuration options for authentication, including providers and callbacks.
 *
 * @property providers - An array of authentication providers. Currently includes:
 *   - GoogleProvider: Configured with client ID, client secret, and authorization parameters.
 *     - `clientId`: The Google OAuth client ID, retrieved from environment variables.
 *     - `clientSecret`: The Google OAuth client secret, retrieved from environment variables.
 *     - `authorization.params`: Additional parameters for the authorization request, such as prompt, access type, and response type.
 *
 * @property callbacks - An object containing callback functions for handling authentication events.
 *   - `signIn`: Handles the sign-in process for a user.
 *     - Connects to the database and checks if a user with the given email already exists.
 *     - Creates a new user in the database if no existing record is found.
 *     - Throws an error if the database connection or user creation fails.
 *   - `session`: Modifies the session object to include the user's ID.
 *     - Retrieves the user from the database based on the email in the session.
 *     - Assigns the user's ID from the database to the session's user object.
 *     - Returns the modified session object.
 */
const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId:
        process.env.GOOGLE_CLIENT_ID ||
        (() => {
          throw new Error("GOOGLE_CLEINT_ID is not defined");
        })(),
      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET ||
        (() => {
          throw new Error("GOOGLE_CLIENT_SECRET is not defined");
        })(),
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    /**
     * Handles the sign-in process for a user.
     *
     * @param profile - The user's profile information, typically obtained from an OAuth provider.
     * @returns A promise that resolves when the sign-in process is complete.
     *
     * @remarks
     * - Logs the user's profile information to the console for debugging purposes.
     * - Connects to the database and checks if a user with the given email already exists.
     * - If the user does not exist, creates a new user with the provided email, name, and profile picture.
     *
     * @throws Will throw an error if the database connection or user creation fails.
     */
    async signIn({ profile }: { profile: { email: string; name: string; picture: string } }) {
      // Establish database connection
      await connectDB();
      // Check for existing user in database using profile email
      const isUserExists = await User.findOne({ email: profile.email });
      // Create new user if no existing record found
      if (!isUserExists) {
        const newUser = {
          email: profile.email,
          username: profile.name.replace(/\s+/g, "").toLowerCase(), // Replace ALL spaces
          image: profile.picture,
        };

        try {
          await User.create(newUser);
          console.log("New user created:", newUser);
        } catch (error) {
          console.error("Error creating user:", error);
          return false; // Return false to deny sign-in if user creation fails
        }
      }
      return true;
    },
    async session({ session }: { session: { user: { email: string; id: string, name: string, image:string } } }) {
      // Retrieve the user from the database based on the email in the session.
      const user = await User.findOne({ email: session.user.email });
      // Assign the user's ID from the database to the session's user object.  Convert the ID to a string for consistency.
      session.user.id = user.id.toString();
      // Return the modified session object.
      return session;
    },
  },
};

export default authOptions;
