"use client";

import LogoIcon from "@/components/common/LogoIcon";
import { useAuth } from "@/hooks";
import { cn } from "@/utils/cn";
import { useForm } from "@tanstack/react-form";
import { Eye, EyeOff, Loader2, Lock, UserRound } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { z } from "zod";

/**
 * Zod schema for sign-in form validation.
 */
const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  remember: z.boolean(),
});

/**
 * Sign-in page with full validation and preserved original styling.
 */
const SignInPage = () => {
  const { signIn, signInWithGoogle, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
    validators: {
      onSubmit: signInSchema,
    },
    onSubmit: async ({ value }) => {
      setError(null);
      try {
        await signIn(value.email, value.password).then(() => {
          router.push("/");
        });
      } catch (err) {
        setError((err as Error).message);
      }
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className={cn(
        "min-w-xs w-full max-w-md md:max-w-3xl",
        "border border-neutral-100 rounded-3xl p-2 shadow-sm",
        "grid grid-cols-1 gap-4 md:grid-cols-11"
      )}
      noValidate
    >
      {/* Left Column */}
      <div
        className={cn(
          "col-span-full md:col-span-6",
          "p-4 flex flex-col items-center"
        )}
      >
        <LogoIcon className="size-12" />
        <h2 className={cn("text-3xl font-bold", "mt-4")}>Welcome Back</h2>
        <p className={cn("text-sm text-neutral-800", "mt-2")}>
          Are you a returning customer?
        </p>

        {/* Email */}
        <form.Field name="email">
          {(field) => (
            <>
              <div className={cn("group relative mt-8", "w-full")}>
                <UserRound className="size-4.5 absolute top-1/2 left-3 -translate-y-1/2 text-neutral-800" />
                <input
                  type="email"
                  placeholder="Your email"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className={cn(
                    "text-sm text-neutral-900 placeholder-neutral-700 font-medium",
                    "w-full h-full pl-9 py-3 rounded-full border",
                    field.state.meta.errors.length
                      ? "border-red-500 focus:ring-red-500"
                      : "border-neutral-300 focus:ring-neutral-500",
                    "focus:outline-none focus:ring-2 focus:border-transparent",
                    "transition-all duration-200"
                  )}
                />
              </div>
              {field.state.meta.errors.map((error, index) => (
                <p
                  key={index}
                  className="text-xs text-red-500 mt-1 ml-2 w-full"
                >
                  {typeof error === "string" ? error : error?.message}
                </p>
              ))}
            </>
          )}
        </form.Field>

        {/* Password */}
        <form.Field name="password">
          {(field) => (
            <>
              <div className={cn("group relative mt-3.5", "w-full")}>
                <Lock className="size-4.5 absolute top-1/2 left-3 -translate-y-1/2 text-neutral-800" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Your password"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className={cn(
                    "text-sm text-neutral-900 placeholder-neutral-700 font-medium",
                    "w-full h-full pl-9 pr-12 py-3 rounded-full border",
                    field.state.meta.errors.length
                      ? "border-red-500 focus:ring-red-500"
                      : "border-neutral-300 focus:ring-neutral-500",
                    "focus:outline-none focus:ring-2 focus:border-transparent",
                    "transition-all duration-200"
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={cn(
                    "absolute top-1/2 right-3 -translate-y-1/2",
                    "text-neutral-800"
                  )}
                >
                  {showPassword ? (
                    <EyeOff className="size-4.5" />
                  ) : (
                    <Eye className="size-4.5" />
                  )}
                </button>
              </div>
              {field.state.meta.errors.map((error, index) => (
                <p
                  key={index}
                  className="text-xs text-red-500 mt-1 ml-2 w-full"
                >
                  {typeof error === "string" ? error : error?.message}
                </p>
              ))}
            </>
          )}
        </form.Field>

        {/* Remember me + Forget Password */}
        <div className="flex justify-between items-center w-full mt-4">
          <form.Field name="remember">
            {(field) => (
              <div className="flex items-baseline flex-nowrap">
                <input
                  type="checkbox"
                  checked={field.state.value}
                  onChange={(e) => field.handleChange(e.target.checked)}
                  className="cursor-pointer"
                />
                <label className="ml-2 text-sm text-neutral-600 font-medium">
                  Remember me
                </label>
              </div>
            )}
          </form.Field>
          <Link
            href="/auth/forgot-password"
            className="text-sm text-neutral-800 font-semibold text-nowrap"
          >
            Forget Password
          </Link>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading || form.state.isSubmitting}
          className={cn(
            "w-full mt-6",
            "bg-neutral-900 text-white font-semibold",
            "py-3 rounded-full",
            "hover:shadow-lg cursor-pointer",
            "active:shadow-inner active:scale-95",
            "transition-all duration-200",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "flex items-center justify-center gap-2"
          )}
        >
          {loading || form.state.isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Signing in...
            </>
          ) : (
            "Sign In"
          )}
        </button>
        {error && <p className="text-sm text-red-600 mt-2 w-full">{error}</p>}

        {/* Divider */}
        <div className="flex items-center gap-2 w-full mt-6">
          <div className="w-full h-px bg-neutral-200" />
          <span className="text-sm text-neutral-400 font-semibold">OR</span>
          <div className="w-full h-px bg-neutral-200" />
        </div>

        {/* Google */}
        <button
          type="button"
          onClick={signInWithGoogle}
          disabled={loading}
          className={cn(
            "w-full mt-6",
            "border border-neutral-300 rounded-full",
            "py-3 flex items-center justify-center gap-3",
            "hover:shadow-lg cursor-pointer",
            "active:scale-95",
            "transition-all duration-300",
            "disabled:opacity-50"
          )}
        >
          <svg height="24" viewBox="0 0 24 24" width="24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
            <path d="M1 1h22v22H1z" fill="none" />
          </svg>
          <span className="text-neutral-900 font-semibold">
            Continue with Google
          </span>
        </button>

        {/* Sign Up Link */}
        <p className={cn("text-sm text-neutral-500", "mt-4")}>
          Don't have an account?{" "}
          <Link
            href="/auth/sign-up"
            className="text-sm text-neutral-800 font-semibold text-nowrap"
          >
            Sign Up
          </Link>
        </p>
      </div>

      {/* Right Column (decorative) */}
      <div
        className={cn(
          "hidden md:block md:col-span-5",
          "p-4 bg-neutral-800 rounded-2xl shadow"
        )}
      />
    </form>
  );
};

export default SignInPage;
