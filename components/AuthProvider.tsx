"use client";
import { SessionProvider } from "next-auth/react";
import { JSX } from "react";

const AuthProvider = ({ children }: { children: JSX.Element }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
