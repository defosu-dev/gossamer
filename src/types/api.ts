// --- Categories ---
export interface CategoryDTO {
  id: string;
  name: string;
  slug: string;
}

// --- Products List (Card) ---
export interface ProductCardDTO {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  rating: number;
  reviewsCount: number;
  category: {
    name: string;
    slug: string;
  } | null;
  price: number;
  oldPrice: number | null;
  imageUrl: string | null;
  defaultVariantId?: string;
}

// --- Product Detail (Full) ---
export interface VariantAttributeDTO {
  name: string;
  slug: string;
  value: string;
  valueId: string;
}

export interface ProductVariantDTO {
  id: string;
  name: string | null;
  sku: string | null;
  price: number | null;
  oldPrice: number | null;
  stock: number | null;
  images: Array<{
    id: string;
    url: string;
    alt: string | null;
  }>;
  attributes: VariantAttributeDTO[];
}

export interface ProductOptionValueDTO {
  id: string;
  value: string;
}

export interface ProductOptionDTO {
  slug: string;
  name: string;
  values: ProductOptionValueDTO[];
}

export interface ProductDetailDTO extends Omit<ProductCardDTO, 'imageUrl' | 'price' | 'oldPrice'> {
  variants: ProductVariantDTO[];
  options: ProductOptionDTO[];
}

// --- Cart ---

export interface CartItemDTO {
  id: string; // ID запису в таблиці cart_items
  variantId: string;
  productId: string;
  title: string;
  slug: string;
  price: number;
  oldPrice: number | null;
  quantity: number;
  stock: number;
  imageUrl: string | null;
  attributesDescription: string;
}

export interface CartDTO {
  id: string; // ID кошика
  items: CartItemDTO[];
  totalPrice: number;
  totalQuantity: number;
}

// --- Orders ---
export interface OrderItemDTO {
  id: string;
  productTitle: string;
  variantName: string | null;
  price: number;
  quantity: number;
  imageUrl: string | null;
}

export interface OrderDTO {
  id: string;
  number: number;
  status: 'pending' | 'paid' | 'shipped' | 'cancelled';
  total: number;
  createdAt: string;
  shipping: {
    name: string;
    address: string;
    email: string;
    phone: string | null;
  };
  items: OrderItemDTO[];
}

// --- Wishlist ---
export interface WishlistItemDTO {
  id: string;
  variantId: string;
  productId: string;
  title: string;
  slug: string;
  price: number;
  oldPrice: number | null;
  imageUrl: string | null;
  inStock: boolean;
  addedAt: string;
}

export interface UserDTO {
  id: string;
  email: string;
  name: string | null;
  avatar_url: string | null;
  phone: string | null;
}

export interface ApiError {
  error: string;
  details?: unknown;
}

export interface AddressDTO {
  id: string;
  title: string | null;
  addressLine1: string;
  addressLine2: string | null;
  city: string;
  state: string | null;
  zipCode: string | null;
  country: string | null;
  phone: string | null;
  isDefault: boolean;
}
