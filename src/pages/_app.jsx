import "@/styles/globals.css";
import Header from "@/components/header";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { users } from "@/lib/users";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    const localStoredUsername = localStorage.getItem("username");
    const currentUser = users.find(
      ({ userName }) => userName === localStoredUsername
    );
    if (currentUser || localStoredUsername === "Guest") {
      router.push("/");
    } else {
      router.push("/login");
    }
  }, []);
  return (
    <>
      <Header />

      <main>
        <Component {...pageProps} />
      </main>
    </>
  );
}
