import React from 'react';
import Logo from './components/Logo';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';

const Header = () => {
  return (
    <header className="w-full">
      <div
        className="mx-auto mb-1 flex max-w-5xl items-center justify-between rounded-b-2xl border border-zinc-300 bg-white px-8 py-4 shadow-sm"
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
