import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import type { AppProps } from "next/app";
import { Theme, FontSize } from "../lib/enums";
import WindowWidthProvider from "../contexts/WindowWidthProvider";
import Header from "../components/header";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState<Theme>(Theme.LIGHT);
  const [font, setFont] = useState<FontSize>(FontSize.MEDIUM);

  const pathname = usePathname();

  const router = useRouter();
  const newUsersDefaultPage = "/login";

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    setTheme(() => (storedTheme === Theme.DARK ? Theme.DARK : Theme.LIGHT));

    const storedFont = localStorage.getItem("font");
    setFont(() =>
      storedFont === "small"
        ? FontSize.SMALL
        : storedFont === "large"
        ? FontSize.LARGE
        : FontSize.MEDIUM
    );

    if (localStorage.getItem("username") === null) {
      router.push("/login");
    }
  }, [pathname]);

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
