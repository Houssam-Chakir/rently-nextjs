"use client";

import getUnreadCount from "@/app/actions/getUnreadCount";
import { useSession } from "next-auth/react";
import { createContext, useState, ReactNode, useContext, useEffect } from "react";

// Define the shape of the context
interface GlobalContextType {
  unreadCount: number;
  setUnreadCount: React.Dispatch<React.SetStateAction<number>>;
}

// Create context with default undefined
const GlobalContext = createContext<GlobalContextType>({
  unreadCount: 0,
  setUnreadCount: () => undefined,
});

// Create provider
export function GlobalProvider({ children }: { children: ReactNode }) {
  const [unreadCount, setUnreadCount] = useState(0);
  const {data: session} = useSession()

  useEffect(()=> {
    if(session && session.user){
      getUnreadCount().then(res => {
        if(res.count) setUnreadCount(res.count)
      })
    }
  }, [session])

  return (
    <GlobalContext.Provider value={{ unreadCount, setUnreadCount }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(GlobalContext)
}
