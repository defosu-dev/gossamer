"use client";
import LogoIcon from "@/components/common/LogoIcon";
import { cn } from "@/utils/cn";
import { Eye, EyeOff, Lock, UserRound } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const page = () => {
  return <form className={cn(
    "min-w-xs w-full max-w-md md:max-w-3xl",
    "border border-neutral-100 rounded-3xl p-2 shadow-sm",
    "grid grid-cols-1 gap-4 md:grid-cols-11",
  )}>
    <div className={cn(
      "col-span-full md:col-span-6",
      "p-4 flex flex-col items-center"
    )}>
      <LogoIcon className="size-12"/>
      <h2 className={cn(
        "text-3xl font-bold",
        "mt-4"
      )}>Welcome Back</h2>
      <p className={cn(
        "text-sm text-neutral-800",
        "mt-2"
      )}>Are you a returning customer?</p>
      <EmailInput />
      <InputPassword />
      <div className="flex justify-between items-center w-full mt-4">
        <div className="w-full flex items-center flex-nowrap">
          <input type="checkbox" name="Remember me" id="" className="cursor-pointer"/>
          <label htmlFor="Remember me" className="ml-2 text-sm text-neutral-600 font-medium">Remember me</label>
        </div>
        <Link href="/auth/forgot-password" className="text-sm text-neutral-800 font-semibold text-nowrap">Forget Password</Link>
      </div>
      <SubmitButton />
      <div className="flex items-center gap-2 w-full mt-6">
        <div className="w-full h-px bg-neutral-200" />
        <span className="text-sm text-neutral-400 font-semibold">OR</span>
        <div className="w-full h-px bg-neutral-200" />
      </div>
      <GoogleAuthButton className="mt-6" />
      <p className={cn(
        "text-sm text-neutral-600 font-medium",
        "mt-4"
      )}>Don&apos;t have an account? <Link href="/auth/sign-up" className="text-sm text-neutral-800 font-semibold text-nowrap">Sign Up</Link></p>
    </div>
    <div className={cn(
      "hidden md:block md:col-span-5",
      "p-4 bg-neutral-800 rounded-2xl",
    )}></div>

  </form>;
};

export default page;


const EmailInput = () => {
  return (
    <div className={cn(
        "group relative mt-8",
        "w-full"
      )}>
        <UserRound className="size-4.5 absolute top-1/2 left-3 -translate-y-1/2 text-neutral-800" />
        <input type="email" name="" id="" placeholder="Your email" className={cn(
          "text-sm text-neutral-900 placeholder-nutral-700 font-medium",
          "w-full h-full pl-9 py-3 rounded-full border border-neutral-300",
          "focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent",
          "transition-all duration-200"
        )} />
      </div>
  )
}


const InputPassword = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  
  return (
    <div className={cn(
      "group relative mt-3.5",
      "w-full"
    )}>
      <Lock className="size-4.5 absolute top-1/2 left-3 -translate-y-1/2 text-neutral-800" />
      <input type={isShowPassword ? "text" : "password"} name="" id="" placeholder="Your password" className={cn(
        "text-sm text-neutral-900 placeholder-nutral-700 font-medium",
        "w-full h-full px-9 py-3 rounded-full border border-neutral-300",
        "focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent",
        "transition-all duration-200"
      )} />
      <button onClick={() => setIsShowPassword(!isShowPassword)} type="button" className={cn(
        "absolute top-1/2 right-3 -translate-y-1/2",
        "text-neutral-800"
      )}>
        {isShowPassword ? <EyeOff className="size-4.5" /> : <Eye className="size-4.5" />}
      </button>
    </div>
  );
}

const SubmitButton = () => {
  return (
    <button type="submit" className={cn(
      "w-full mt-6",
      "bg-neutral-900 text-white font-semibold",
      "py-3 rounded-full",
      "hover:shadow-lg cursor-pointer",
      "active:shadow-inner active:scale-95",
      "transition-all duration-200"
    )}>Sign In</button>
  )
}

const GoogleAuthButton = ({className}: {className?: string}) => {
  return (
    <button type="button" className={cn(
      "w-full mt-4",
      "border border-neutral-300 rounded-full",
      "py-3 flex items-center justify-center gap-3",
      "hover:shadow-lg cursor-pointer",
      "active:scale-95",
      "transition-all duration-300",
      className
    )}>
      <svg height="24" viewBox="0 0 24 24" width="24">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        <path d="M1 1h22v22H1z" fill="none" />
      </svg>
      <span className="text-neutral-900 font-semibold">Countinue with Google</span>
    </button>
  )
}
