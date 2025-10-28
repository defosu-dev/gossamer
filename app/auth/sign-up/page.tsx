"use client";

import LogoIcon from "@/components/common/LogoIcon";
import { useAuth } from "@/hooks";
import { cn } from "@/utils/cn";
import { useForm } from "@tanstack/react-form";
import { Eye, EyeOff, Loader2, Lock, Mail, UserRound } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { z } from "zod";

/**
 * Zod schema for sign-up form validation.
 */
const signUpSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(50, "Full name too long"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[0-9]/, "Must contain at least one number"),
  agree: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

/**
 * Sign-up page with full validation and preserved original styling.
 */
const SignUpPage = () => {
  const { signUp, signInWithGoogle, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      agree: false,
    },
    validators: {
      onSubmit: signUpSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await signUp(value.email, value.password, value.fullName).then(() => {
          router.push("/auth/sign-in");
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
        <h2 className={cn("text-3xl font-bold", "mt-4")}>Ready to Join</h2>
        <p className={cn("text-sm text-neutral-800", "mt-2")}>
          Are you ready to join us?
        </p>

        {/* Full Name */}
        <form.Field name="fullName">
          {(field) => (
            <>
              <div className={cn("group relative mt-8", "w-full")}>
                <UserRound className="size-4.5 absolute top-1/2 left-3 -translate-y-1/2 text-neutral-800" />
                <input
                  type="text"
                  placeholder="Your full name"
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
                  {typeof error === "string"
                    ? error
                    : error?.message ?? "Invalid password"}
                </p>
              ))}
            </>
          )}
        </form.Field>

        {/* Email */}
        <form.Field name="email">
          {(field) => (
            <>
              <div className={cn("group relative mt-3.5", "w-full")}>
                <Mail className="size-4.5 absolute top-1/2 left-3 -translate-y-1/2 text-neutral-800" />
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
                  {typeof error === "string"
                    ? error
                    : error?.message ?? "Invalid password"}
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
                  {typeof error === "string"
                    ? error
                    : error?.message ?? "Invalid password"}
                </p>
              ))}
            </>
          )}
        </form.Field>

        {/* Terms Checkbox */}
        <form.Field name="agree">
          {(field) => (
            <div className="flex flex-col w-full mt-4">
              <div className="w-full flex items-baseline flex-nowrap">
                <input
                  type="checkbox"
                  checked={field.state.value}
                  onChange={(e) => field.handleChange(e.target.checked)}
                  onBlur={field.handleBlur}
                  className="cursor-pointer"
                />
                <label className="ml-2 text-sm text-neutral-600 font-medium">
                  I agree to the Gossamer terms and conditions and the privacy
                  policy
                </label>
              </div>
              {field.state.meta.isTouched &&
                field.state.meta.errors.map((error, index) => (
                  <p
                    key={index}
                    className="text-xs text-red-500 mt-1 ml-2 w-full"
                  >
                    {typeof error === "string" ? error : error?.message}
                  </p>
                ))}
            </div>
          )}
        </form.Field>

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
              Creating account...
            </>
          ) : (
            "Sign Up"
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

        {/* Sign In Link */}
        <p className={cn("text-sm text-neutral-500", "mt-4")}>
          Have an account?{" "}
          <Link
            href="/auth/sign-in"
            className="text-sm text-neutral-800 font-semibold text-nowrap"
          >
            Sign In
          </Link>
        </p>

        <p
          className={cn(
            "text-sm text-neutral-500 leading-6",
            "mt-6 text-center"
          )}
        >
          By signing up you agree to our <br />{" "}
          <Link
            href="#"
            className="text-sm text-neutral-800 font-bold text-nowrap"
          >
            Terms
          </Link>{" "}
          and{" "}
          <Link
            href="#"
            className="text-sm text-neutral-800 font-semibold text-nowrap"
          >
            Privacy Policy
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

export default SignUpPage;
