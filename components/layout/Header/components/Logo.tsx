import React from 'react';
import Link from 'next/link';
import LogoIcon from '../../../common/LogoIcon';

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <LogoIcon />
      <span className="text-xl font-bold text-black">Gossamer</span>
    </Link>
  );
};

export default Logo;
