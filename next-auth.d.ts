import NextAuth, { DefaultSession, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";

interface Organization {
  id: string;
  name: string;

  products: string[];
}

declare module "next-auth/jwt" {
  interface JWT {
    user: User;
  }
}

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User {
    selectedOrgId: string;
    id: string;
    name: string;
    organizations: Organization[];
  }

  interface Session {
    user: User;
  }
}
