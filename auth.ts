import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { getAuthConfigState } from "@/lib/auth-config";

const authConfig = getAuthConfigState();

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  secret: authConfig.authSecret,
  trustHost: true,
  providers: authConfig.githubConfigured
    ? [
        GitHub({
          clientId: authConfig.githubId,
          clientSecret: authConfig.githubSecret,
          authorization: {
            params: {
              scope: "read:user repo",
            },
          },
        }),
      ]
    : [],
  pages: {
    signIn: "/",
  },
  callbacks: {
    jwt({ token, account, profile }) {
      if (account?.provider === "github") {
        token.accessToken = account.access_token;
      }

      if (profile && "login" in profile && typeof profile.login === "string") {
        token.login = profile.login;
      }

      return token;
    },
    session({ session, token }) {
      if (token.accessToken && typeof token.accessToken === "string") {
        session.accessToken = token.accessToken;
      }

      if (session.user && token.login && typeof token.login === "string") {
        session.user.login = token.login;
      }

      return session;
    },
  },
});
