import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const auth: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { type: "text" },
        password: { type: "password" },
      },
      authorize(credentials) {
        if (
          credentials?.username === "admin" &&
          credentials.password === "admin"
        ) {
          return {
            id: "1",
            name: "admin",
            selectedOrgId: "2",
            organizations: [
              {
                id: "1",
                name: "admin",
                products: ["placement-service", "quality-index"],
              },
              {
                id: "2",
                name: "admin",
                products: ["placement-service"],
              },
              {
                id: "3",
                name: "admin",
                products: [],
              },
            ],
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user = token.user;

      return session;
    },
    async jwt({ token, user }) {
      if (user) token.user = user;

      return token;
    },
  },
};

export default auth;
