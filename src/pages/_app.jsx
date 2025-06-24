import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import WindowWidthProvider from "@/contexts/WindowWidthProvider";
import { users } from "@/lib/users";
import Header from "@/components/header";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  const [theme, setTheme] = useState("");
  const [font, setFont] = useState("");

  const router = useRouter();
  const newUsersDefaultPage = "/login";

  useEffect(() => {
    setTheme(localStorage.getItem("theme"));
    setFont(localStorage.getItem("font"))
  }, [])

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    const currentUser = users.find(
      ({ userName }) => userName === savedUsername
    );

    if (currentUser || savedUsername === "Guest") router.push("/");
    else router.push(newUsersDefaultPage);
  }, []);

 useEffect(() => {
  document.body.classList.remove("light", "dark");

  if (theme === "dark") {
    document.body.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.add("light");
    localStorage.setItem("theme", "light");
  }

  document.body.classList.remove("small", "medium", "large");

  if (font === "small") {
    document.body.classList.add("small");
    localStorage.setItem("font", "small");
  } else if (font === "large") {
    document.body.classList.add("large");
    localStorage.setItem("font", "large");
  } else {
    document.body.classList.add("medium");
    localStorage.setItem("font", "medium");
  }
}, [theme, font]);

  return (
    <WindowWidthProvider>
      <Header newUsersDefaultPage={newUsersDefaultPage} theme={theme} setTheme={setTheme} font={font} setFont={setFont}/>
      <main>
        <Component {...pageProps} theme={theme}/>
      </main>
    </WindowWidthProvider>
  );
}
