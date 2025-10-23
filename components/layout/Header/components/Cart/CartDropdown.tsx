'use client'
import { cn } from '@/utils/cn'
import CartItem, { CartItemType } from './CartItem'
import Link from 'next/link'

type Props = {
  open: boolean
  onClose: () => void
  items: CartItemType[]
}

export default function CartDropdown({ open, onClose, items }: Props) {
  const total = items.reduce((s, i) => s + i.price.currentPrice * i.quantity, 0).toFixed(2)

  return (
    <div
      role="menu"
      aria-hidden={!open}
      className={cn(
        "absolute right-0 mt-2 flex-col w-xs md:w-lg z-50 bg-white origin-top-right transition-all duration-200 overflow-hidden",
        open ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" : "opacity-0 scale-95 -translate-y-1 pointer-events-none",
        "border border-neutral-300 rounded-xl shadow-xl"
        
      )}
    >
      <ul className="max-h-96 overflow-y-auto scroll-smooth divide-y divide-gray-200">
        {items.map((item) => (
         <CartItem key={item.handle} item={item} />
        ))}
      </ul>

      <div className="border-t border-gray-200 px-3 py-2 flex justify-between items-center gap-4">
        <Link href="/cart" onClick={onClose} className='text font-semibold underline'>All products</Link>
       <span className='font-semibold'> Total: ${total}</span>
      </div>
    </div>
  )
}


