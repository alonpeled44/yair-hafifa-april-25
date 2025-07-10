import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import { users } from "../lib/users";
import { Theme, FontSize } from "../lib/enums";
import WindowWidthProvider from "../contexts/WindowWidthProvider";
import Header from "../components/header";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState<Theme>(Theme.LIGHT);
  const [font, setFont] = useState<FontSize>(FontSize.MEDIUM);

  const router = useRouter();
  const newUsersDefaultPage = "/login";

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === Theme.DARK || storedTheme === Theme.LIGHT) {
      setTheme(storedTheme);
    }

    const storedFont = localStorage.getItem("font");
    if (FontSize[storedFont as keyof typeof FontSize]) {
      setFont(storedFont as FontSize);
    }

    const savedUsername = localStorage.getItem("username");
    const currentUser = users.find(
      ({ userName }) => userName === savedUsername
    );

    router.push(currentUser || savedUsername === "Guest" ? "/" : "/login");
  }, []);

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
