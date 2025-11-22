import React from "react";
import List from "./List";
import SocialMediaList from "./SocialMediaList";
import Copyright from "./Copyright";
import DistributionBlock from "./DistributionBlock";

const Footer = () => {
  return (
    <footer className="bg-white mt-8 border border-zinc-300 max-w-6xl mx-auto items-center shadows-sm px-8 rounded-2xl rounded-b-none">
      <DistributionBlock visible={false} />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-4 md:px-16 py-8">
        <List />
        <SocialMediaList />
      </div>

      <Copyright />
    </footer>
  );
};

export default Footer;
