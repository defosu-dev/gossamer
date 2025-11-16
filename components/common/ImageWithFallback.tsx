"use client";
import { useState, useEffect, CSSProperties } from "react";
import Image from "next/image";
import { Image as ImageIcon, Loader2 } from "lucide-react";
import { cn } from "@/utils/cn";

export type ImageWithFallbackProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  timeout?: number;
  className?: string;
  style?: CSSProperties;
  iconSize?: number;
  sizes?: string;
  priority?: boolean;
};

/**
 * ImageWithFallback
 *
 * A responsive Next.js Image component with:
 * - Loading spinner while fetching the image
 * - Fallback icon if the image fails to load or exceeds a loading timeout
 * - Optional width, height, CSS classes, inline styles, and icon size
 *
 * Props:
 * @param src       - Image URL (required)
 * @param alt       - Alt text for accessibility (required)
 * @param width     - Optional width in pixels (default: 100%)
 * @param height    - Optional height in pixels (default: 100%)
 * @param timeout   - Optional loading timeout in ms (default: 5000)
 * @param className - Optional extra classes for the container
 * @param style     - Optional inline styles for the container
 * @param iconSize  - Optional Tailwind size units for the loader/fallback icon (default: 4)
 * @param sizes     - Optional responsive sizes for Next.js Image (default: adaptive)
 * @param priority  - Optional: set true for LCP images (above the fold)
 */
export function ImageWithFallback({
  src,
  alt,
  width,
  height,
  timeout = 5000,
  className,
  style,
  iconSize = 4,
  sizes = "(max-width: 768px) 100vw, 33vw",
  priority = false,
}: ImageWithFallbackProps) {
  const [status, setStatus] = useState<"loading" | "error" | "loaded">(
    "loading",
  );

  useEffect(() => {
    if (status === "loading" && src) {
      const timer = setTimeout(() => setStatus("error"), timeout);
      return () => clearTimeout(timer);
    }
  }, [status, src, timeout]);

  const containerStyle: CSSProperties = {
    width: width ?? "100%",
    height: height ?? "100%",
    position: "relative",
    overflow: "hidden",
    borderRadius: "inherit",
    ...style,
  };

  const baseContainerClasses =
    "flex items-center justify-center bg-neutral-100 absolute inset-0 rounded-[inherit]";

  return (
    <div style={containerStyle} className={className}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        onLoad={() => setStatus("loaded")}
        onError={() => setStatus("error")}
        className="object-cover rounded-[inherit]"
      />
      {/* Overlay: Spinner */}
      {status === "loading" && (
        <div
          className={cn(baseContainerClasses)}
          aria-label={`Loading image: ${alt}`}
        >
          <Loader2
            className={cn(`size-${iconSize} animate-spin text-gray-500`)}
          />
        </div>
      )}

      {/* Overlay: Error */}
      {status === "error" && (
        <div
          className={cn(baseContainerClasses)}
          aria-label={`Failed to load: ${alt}`}
        >
          <ImageIcon
            className={cn(`w-${iconSize} h-${iconSize} text-gray-500`)}
          />
        </div>
      )}
    </div>
  );
}
