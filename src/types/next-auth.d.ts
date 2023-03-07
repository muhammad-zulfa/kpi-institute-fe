// eslint-disable-next-line no-unused-vars
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  // eslint-disable-next-line no-unused-vars
  interface Session extends DefaultSession {
    accessToken: string | unknown;
    user?: User
  }

  // eslint-disable-next-line no-unused-vars
  interface User extends DefaultUser {
    accessToken?: string;
    role: string | unknown;
    id?: string | unknown;
  }
}
