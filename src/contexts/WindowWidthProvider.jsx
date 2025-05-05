import { createContext, useState, useEffect, useContext } from "react";

const WindowWidthContext = createContext(0);

export default function WindowWidthProvider({ children }) {
  const [windowWidth, setWindowWidth] = useState(0);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <WindowWidthContext.Provider value={windowWidth}>
      {children}
    </WindowWidthContext.Provider>
  );
}

export function useWindowWidth() {
  const context = useContext(WindowWidthContext);

  if (!context) {
    console.error("useWindowWidth must be used within a WindowWidthProvider");
  }

  return context;
}
