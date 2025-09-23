import React from "react";
import Logo from "./Logo";
import NavBar from "./NavBar";
import SideBar from "./SideBar";

const Header = () => {
  return (
    <header className="w-full">
      <div
        className="mx-auto flex max-w-6xl items-center justify-between bg-white px-8 py-4 shadow-sm rounded-b-2xl border border-zinc-300"
        style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
      >
        <Logo />

        <NavBar />

        <SideBar />
      </div>
    </header>
  );
};

export default Header;
