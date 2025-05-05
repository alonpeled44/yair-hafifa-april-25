import { usePathname } from "next/navigation";
import { createContext, useState, useEffect, useContext } from "react";

const UserNameContext = createContext("");

export default function UserNameProvider({ children }) {
  const [userName, setUserName] = useState("");

  const pathname = usePathname();

  useEffect(() => {
    setUserName(localStorage.getItem("username"));
  }, [pathname]);

  return (
    <UserNameContext.Provider value={userName}>
      {children}
    </UserNameContext.Provider>
  );
}

export function useUserName() {
  const context = useContext(UserNameContext);

  if (!context) {
    console.error("useWindowWidth must be used within a UserNameProvider");
  }

  return context;
}
