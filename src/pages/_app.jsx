import { useEffect } from "react";
import { useRouter } from "next/router";
import WindowWidthProvider from "@/contexts/WindowWidthProvider";
import { users } from "@/lib/users";
import Header from "@/components/header";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const newUsersDefaultPage = "/login";

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    const currentUser = users.find(
      ({ userName }) => userName === savedUsername
    );

    if (currentUser || savedUsername === "Guest") router.push("/");
    else router.push(newUsersDefaultPage);
  }, []);

  return (
    <WindowWidthProvider>
      <Header newUsersDefaultPage={newUsersDefaultPage} />
      <main>
        <Component {...pageProps} />
      </main>
    </WindowWidthProvider>
  );
}
