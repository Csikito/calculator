import React from "react";

function ThemeSwitcher(props) {
  return (
    <section className=" w-[100px] sml:w-[150px] text-base uppercase font-[500] flex flex-row sml:flex-col justify-center items-center gap-0 sml:gap-4 p-1 ">
      <p className="rotate-[-60deg] sml:rotate-0">Theme</p>
      <nav className="flex flex-col sml:flex-row gap-0 sml:gap-2 text-[25px] relative rotate-[30deg] sml:rotate-0">
        <div
          className="theme__btn cursor-pointer bg-opacity-0 light"
          onClick={() => props.handleChangeTheme("light")}
        >
          ☀️
        </div>
        <div
          className="theme__btn cursor-pointer  bg-opacity-0 dark "
          onClick={() => props.handleChangeTheme("dark")}
        >
          🌛
        </div>
        <div
          className="theme__btn cursor-pointer bg-opacity-0 rainbow "
          onClick={() => props.handleChangeTheme("rainbow")}
        >
          🌈
        </div>
      </nav>
    </section>
  );
}

export default ThemeSwitcher;
