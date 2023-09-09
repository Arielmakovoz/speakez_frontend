import { useEffect, useState } from "react";

export const changeColor = () => {
  // if set via local storage previously
  if (localStorage.getItem("theme")) {
    if (localStorage.getItem("theme") === "light") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }

    // if NOT set via local storage previously
  } else {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  }
};

export const setColor = (color: "light" | "dark") => {
  localStorage.theme = color;
};

export const useIsDark = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(localStorage.theme === "dark");
  }, []);

  return { isDark };
};
