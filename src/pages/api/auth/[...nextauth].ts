import environment from "@/config/environment";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWTExtended, SessionExtended, UserExtended } from "@/types/Auth";
import authServices from "@/services/auth.service";

export default NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
  },
  secret: environment.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        identifier: { label: "Identifier", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { identifier, password } = credentials as {
          identifier: string;
          password: string;
        };

        if (!identifier || !password) return null;

        try {
          const loginResult = await authServices.login({ identifier, password });
          const accessToken = loginResult.data.data;

          const meResult = await authServices.getProfileWithToken(accessToken);
          const user = meResult.data.data;

          if (accessToken && loginResult.status === 200 && user._id && meResult.status === 200) {
            user.accessToken = accessToken;
            return user;
          }

          return null;
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWTExtended; user: UserExtended | null }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }: { session: SessionExtended; token: JWTExtended }) {
      session.user = token.user;
      session.accessToken = token.user?.accessToken;
      return session;
    },
  },
});
