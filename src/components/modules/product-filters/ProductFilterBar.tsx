'use client';
import { useState } from 'react';
import {
  Archive,
  Home,
  Music,
  Phone,
  Sparkles,
  Star,
  Percent,
  Box,
  Package,
  Tag,
} from 'lucide-react';

import { Category } from '@/components/ui/Category';

import { Pagination } from './Pagination';

export function ProductFilterBar() {
  const [page, setPage] = useState(1);
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      <div className="space-y-4">
        <Category
          title="All Products"
          icon={<Archive className="size-4" />}
          sub={[
            { label: 'For Home', icon: <Home className="size-4" /> },
            { label: 'For Music', icon: <Music className="size-4" /> },
            { label: 'For Phone', icon: <Phone className="size-4" /> },
            { label: 'For Storage', icon: <Box className="size-4" /> },
          ]}
        />

        <Category
          title="New Arrival"
          icon={<Sparkles className="size-4" />}
          sub={[
            { label: 'Damaged', icon: <Package className="size-4" /> },
            { label: 'Wrong Item', icon: <Tag className="size-4" /> },
          ]}
        />

        <Category
          title="Best Seller"
          icon={<Star className="size-4" />}
          sub={[
            { label: 'Discounts', icon: <Percent className="size-4" /> },
            { label: 'Coupons', icon: <Tag className="size-4" /> },
          ]}
        />

        <Category
          title="On Discount"
          icon={<Percent className="size-4" />}
          sub={[
            { label: 'Black Friday', icon: <Tag className="size-4" /> },
            { label: 'Season Sale', icon: <Tag className="size-4" /> },
          ]}
        />
      </div>
      <Pagination currentPage={page} totalPages={10} onPageChange={setPage} />
    </div>
  );
}
