/* eslint-disable new-cap */
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { API } from "@configs/api";

export type sessionType = {
  accessToken: string;
  user?: object;
  expires: string;
};
export default NextAuth({
  secret: process.env.NEXT_CREDENTIALS_CLIENT_SECRET,
  session: {
    maxAge: 60 * 60 * 2,
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "username",
        },
        password: { label: "Password", type: "password", placeholder: "*****" },
      },
      authorize: async (credentials: any, req) => {
        const res = await new API()
          .post("auth/login")
          .payload({
            username: credentials.username,
            password: credentials.password,
          })
          .fetch();
        const {data: auth} = res;
        if (auth && !!auth.response && auth.response?.status !== 200) {
          throw new Error(auth.response.data.message);
        }

        if (auth) {
          return {
            ...auth,
            token: auth.accessToken,
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        
        const newToken: any = {};
        newToken.accessToken = user.accessToken;
        newToken.user = (user as any).user
        return newToken;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.accessToken = token.accessToken;
      session.user = token.user as any;
      return session;
    },
    async signIn({ user, account }) {
      if (user) return true;

      return false;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  pages: {
    signIn: "/auth/sign-in",
    error: "/auth/sign-in",
  },
});
