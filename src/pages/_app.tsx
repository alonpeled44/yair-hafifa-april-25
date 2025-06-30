import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import WindowWidthProvider from "../contexts/WindowWidthProvider";
import { users } from "../lib/users";
import Header from "../components/header";
import { Themes, FontSize } from "../lib/enums";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState<Themes>(Themes.LIGHT);
  const [font, setFont] = useState<FontSize>(FontSize.MEDIUM);

  const router = useRouter();
  const newUsersDefaultPage = "/login";

  // Load theme and font from localStorage on first render
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === Themes.DARK || storedTheme === Themes.LIGHT) {
      setTheme(storedTheme);
    }

    const storedFont = localStorage.getItem("font");
    if (
      storedFont === FontSize.SMALL ||
      storedFont === FontSize.MEDIUM ||
      storedFont === FontSize.LARGE
    ) {
      setFont(storedFont);
    }
  }, []);

  // Redirect based on saved username
  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    const currentUser = users.find(
      ({ userName }) => userName === savedUsername
    );

    if (currentUser || savedUsername === "Guest") router.push("/");
    else router.push(newUsersDefaultPage);
  }, []);

  // Update body classes and localStorage when theme or font changes
  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
    localStorage.setItem("theme", theme);

    document.body.classList.remove("small", "medium", "large");
    document.body.classList.add(font);
    localStorage.setItem("font", font);
  }, [theme, font]);

  return (
    <WindowWidthProvider>
      <Header
        newUsersDefaultPage={newUsersDefaultPage}
        theme={theme}
        setTheme={setTheme}
        font={font}
        setFont={setFont}
      />
      <main>
        <Component {...pageProps} theme={theme} />
      </main>
    </WindowWidthProvider>
  );
}
