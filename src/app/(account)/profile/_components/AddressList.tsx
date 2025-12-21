'use client';

import { MapPin, Plus, Trash2 } from 'lucide-react';
import { useAddresses, useDeleteAddress } from '@/hooks/user';
import Button from '@/components/ui/Button';

export function AddressList() {
  const { data: addresses, isLoading } = useAddresses();
  const { mutate: deleteAddress } = useDeleteAddress();

  if (isLoading)
    return <div className="py-10 text-center text-sm text-neutral-500">Loading addresses...</div>;

  return (
    <div className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Shipping Addresses</h2>
        <Button className="gap-2">
          <Plus className="size-4" /> Add New
        </Button>
      </div>

      {!addresses?.length ? (
        <div className="rounded-xl border-2 border-dashed border-neutral-100 py-8 text-center text-neutral-400">
          No addresses saved yet.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className="relative rounded-xl border border-neutral-200 p-4 transition hover:border-neutral-300"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="size-4 text-neutral-400" />
                  <span className="font-medium text-neutral-900">{addr.title || 'Address'}</span>
                  {addr.isDefault && (
                    <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] font-semibold text-neutral-600">
                      Default
                    </span>
                  )}
                </div>
                <button
                  onClick={() => deleteAddress(addr.id)}
                  className="text-neutral-400 transition-colors hover:text-red-500"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
              <p className="mt-2 line-clamp-2 text-sm text-neutral-600">
                {addr.addressLine1}, {addr.city}
              </p>
              <p className="mt-1 text-xs text-neutral-400">{addr.phone}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
