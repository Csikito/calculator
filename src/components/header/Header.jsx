import React from "react";
import ThemeSwitcher from "./ThemeSwitcher";
import Contact from "./Contact";

function Header({ handleChangeTheme, theme }) {
  return (
    <header
      className={`${
        theme === "rainbow" ? "rainbow shadow-md shadow-white" : theme
      } w-full h-32 sml:h-24 flex text-base uppercase font-[500] flex-row justify-normal sml:justify-evenly items-center`}
    >
      <h1 className="rotate-[-60deg] sml:rotate-0 text-[16px] sml:text-[20px]">
        Calculator
      </h1>
      <ThemeSwitcher handleChangeTheme={handleChangeTheme} theme={theme} />
      <Contact theme={theme} />
    </header>
  );
}

export default Header;
