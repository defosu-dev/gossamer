'use client';
import DarkBackground from '@/components/ui/DarkBackground';
import { cn } from '@/lib/utils/cn';
import { useCallback, useEffect, useState } from 'react';
import SearchButton from './SearchButton';
import SearchModal from './SearchModal';

function Search() {
  const [open, setOpen] = useState(false);

  const toggle = useCallback(() => setOpen((v) => !v), []);
  const closeCart = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, closeCart]);

  return (
    <div className={cn('')}>
      <SearchButton open={open} onClick={toggle} />
      <DarkBackground open={open} onClose={closeCart} />
      <SearchModal open={open} onClose={closeCart} />
    </div>
  );
}

export default Search;
