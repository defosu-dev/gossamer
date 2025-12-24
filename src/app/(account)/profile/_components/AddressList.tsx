'use client';

import { MapPin, Plus, Trash2 } from 'lucide-react';
import { useAddresses, useDeleteAddress } from '@/hooks/user';
import { cn } from '@/lib/utils/cn';

export function AddressList() {
  const { data: addresses, isLoading } = useAddresses();
  const { mutate: deleteAddress } = useDeleteAddress();

  return (
    <div className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-xl shadow-neutral-100/50">
      {/* Header with improved layout */}
      <div className="mb-6 flex items-center justify-between gap-4 border-b border-neutral-100 pb-4">
        <div className="flex items-center gap-2">
          <MapPin className="size-5 text-neutral-400" />
          <h2 className="text-lg font-bold text-neutral-900">Shipping Addresses</h2>
        </div>

        <button
          className="flex items-center gap-1.5 rounded-full bg-neutral-900 px-3 py-1.5 text-xs font-semibold text-white transition-all hover:bg-neutral-800 active:scale-95"
          onClick={() => {
            /* Add Modal Logic */
          }}
        >
          <Plus className="size-3.5" /> New
        </button>
      </div>

      {isLoading ? (
        <div className="py-8 text-center text-sm text-neutral-400">Loading...</div>
      ) : !addresses?.length ? (
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-neutral-100 py-8 text-center">
          <MapPin className="mb-2 size-8 text-neutral-200" />
          <p className="text-sm text-neutral-400">No addresses saved yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className="group relative rounded-xl border border-neutral-100 bg-neutral-50/50 p-4 transition-all hover:border-neutral-200 hover:bg-white hover:shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-neutral-900">
                      {addr.title || 'Address'}
                    </span>
                    {addr.isDefault && (
                      <span className="rounded-full bg-neutral-200 px-1.5 py-0.5 text-[10px] font-bold tracking-wider text-neutral-600 uppercase">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="mt-1 max-w-[200px] text-xs leading-relaxed text-neutral-600">
                    {addr.addressLine1}, {addr.city}
                  </p>
                  <p className="mt-1 text-xs text-neutral-400">{addr.phone}</p>
                </div>

                <button
                  onClick={() => deleteAddress(addr.id)}
                  className="rounded-full p-2 text-neutral-400 opacity-0 transition-all group-hover:opacity-100 hover:bg-red-50 hover:text-red-500"
                  title="Delete address"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
