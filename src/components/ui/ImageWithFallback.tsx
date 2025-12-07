'use client';
import { Image as ImageIcon, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { memo, useEffect, useState, type CSSProperties } from 'react';

import { cn } from '@/lib/utils/cn';

/**
 * Props for ImageWithFallback.
 */
export interface ImageWithFallbackProps {
  src: string | null | undefined;
  alt: string;
  width?: number;
  height?: number;
  timeout?: number;
  className?: string;
  style?: CSSProperties;
  iconSize?: number;
  sizes?: string;
  priority?: boolean;
}

/**
 * ImageWithFallback.
 *
 * A responsive Next.js Image component with fallback support.
 *
 * @remarks
 * - Shows a loading spinner while the image is loading.
 * - Shows a fallback icon if the image fails to load or exceeds the timeout.
 * - Accepts optional width, height, className, inline styles, icon size, responsive sizes, and priority.
 * - Fully compatible with Next.js Image optimizations.
 */
export function ImageWithFallback({
  src,
  alt,
  width,
  height,
  timeout = 5000,
  className,
  style,
  iconSize = 5,
  sizes = '(max-width: 768px) 100vw, 33vw',
  priority = false,
}: ImageWithFallbackProps) {
  const [status, setStatus] = useState<'loading' | 'error' | 'loaded'>(src ? 'loading' : 'error');

  useEffect(() => {
    if (src) {
      setStatus('loading');

      const timer = setTimeout(() => {
        setStatus((prevStatus) => (prevStatus === 'loading' ? 'error' : prevStatus));
      }, timeout);

      return () => clearTimeout(timer);
    } else {
      setStatus('error');
    }
  }, [src, timeout]);

  const containerStyle: CSSProperties = {
    width: width ?? '100%',
    height: height ?? '100%',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 'inherit',
    ...style,
  };

  const overlayClasses = cn(
    'flex items-center justify-center bg-neutral-100 absolute inset-0 rounded-[inherit]'
  );

  const iconSizeClasses = `size-${iconSize}`;

  return (
    <div style={containerStyle} className={cn(className)}>
      {src && (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
          className={cn(
            'rounded-[inherit] object-cover transition-opacity duration-300',
            status === 'loaded' ? 'opacity-100' : 'opacity-0'
          )}
        />
      )}

      {status === 'loading' && (
        <div className={overlayClasses} aria-label={`Loading image: ${alt}`}>
          <Loader2 className={cn(iconSizeClasses, 'animate-spin text-gray-500')} />
        </div>
      )}

      {status === 'error' && (
        <div className={overlayClasses} aria-label={`Failed to load: ${alt}`}>
          <ImageIcon className={cn(iconSizeClasses, 'text-gray-500')} />
        </div>
      )}
    </div>
  );
}

export default memo(ImageWithFallback);
