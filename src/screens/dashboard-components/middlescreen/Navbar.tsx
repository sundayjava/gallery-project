import { useState } from "react";
import { appTitle } from "../../../constant";
import { navlinks } from "../../../constant/dummydata";

const Navbar = () => {
  const [activeNav, setActiveNav] = useState("");
  return (
    <nav className="flex items-center w-full justify-between px-6 py-2 border-b-2 z-10 bg-white">
      <h2 className="font-bold font-poppins text-[14px] tracking-wider text-[#1a202c]">
        {appTitle}
      </h2>

      <ul className="flex list-none items-center gap-4">
        {navlinks.map((link) => (
          <li
            key={link.id}
            onClick={() => setActiveNav(link.link)}
            className="text-[13px] cursor-pointer"
          >
            <a
              className={`${
                activeNav === link.link
                  ? "font-black font-poppins border-b-2 text-[#fbbc05]"
                  : "font-[100] text-black/60"
              }`}
            >
              {link.link}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
