import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { GrMail } from "react-icons/gr";

function Contact({ theme }) {
  return (
    <section className="w-[100px] sml:w-[150px] flex flex-row sml:flex-col items-center gap-0 sml:gap-4 text-base uppercase p-2 ">
      <p className=" font-[500] rotate-[-60deg] sml:rotate-0">Contact</p>
      <div className="flex flex-col sml:flex-row gap-0 sml:gap-5 rotate-[30deg] sml:rotate-0">
        <a
          href="https://hu.linkedin.com/in/ronald-csik%C3%B3s-a60938235?original_referer="
          target="_blank"
          rel="noreferrer"
          className={`${theme} contact `}
        >
          <FaLinkedin />
        </a>
        <a
          href="https://github.com/Csikito"
          target="_blank"
          rel="noreferrer"
          className={`${theme} contact `}
        >
          <FaGithub />
        </a>
        <a href="mailto:csikosronald@gmail.com" className={`${theme} contact `}>
          <GrMail />
        </a>
      </div>
    </section>
  );
}

export default Contact;
