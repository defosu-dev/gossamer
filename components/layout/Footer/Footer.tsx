import React from 'react';
import List from './List';
import SocialMediaList from './SocialMediaList';
import Copyright from './Copyright';
import DistributionBlock from './DistributionBlock';

const Footer = () => {
  return (
    <footer className="shadows-sm mx-auto mt-8 max-w-6xl items-center rounded-2xl rounded-b-none border border-zinc-300 bg-white px-8">
      <DistributionBlock />
      <div className="flex flex-col items-start justify-between px-4 py-8 md:flex-row md:items-center md:px-16">
        <List />
        <SocialMediaList />
      </div>
      <Copyright />
    </footer>
  );
};

export default Footer;
