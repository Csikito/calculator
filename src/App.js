import React, { useState, useEffect } from "react";

import Header from "./components/header/Header";
import Calculator from "./components/calculator/Calculator";

function App() {
  const [theme, setTheme] = useState("light");

  const handleChangeTheme = (theme) => {
    setTheme(theme);
    toggleTheme(theme);
    localStorage.setItem("current-theme", JSON.stringify(theme));
  };

  const toggleTheme = (theme) => {
    const themeBtns = document.querySelectorAll(".theme__btn");
    themeBtns.forEach((e) => {
      if (e.classList.contains(theme)) {
        e.classList.add("active");
      } else e.classList.remove("active");
    });
  };

  useEffect(() => {
    const currentTheme = JSON.parse(localStorage.getItem("current-theme"));
    if (currentTheme) {
      setTheme(currentTheme);
      toggleTheme(theme);
    }
  }, [theme]);

  return (
    <div className={`${theme} background`}>
      <div>
        <Header handleChangeTheme={handleChangeTheme} theme={theme} />
        <Calculator className="relative" theme={theme} />
      </div>
    </div>
  );
}

export default App;
