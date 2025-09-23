import React from "react";
import Link from "next/link";
import { Gem } from "lucide-react";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Gem className="h-6 w-6 text-black" />
      <span className="text-xl font-bold text-black">Gossamer</span>
    </Link>
  );
};

export default Logo;
