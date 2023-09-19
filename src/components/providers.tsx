"use client";

import { SessionProvider } from "next-auth/react";
import React, { FC } from "react";

interface providersProps {
  children: React.ReactNode;
}

const providers: FC<providersProps> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default providers;
