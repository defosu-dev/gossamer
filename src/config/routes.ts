export type AuthRequirement = 'public' | 'protected';
export type UserRole = 'user' | 'admin' | 'moderator';

type RouteBase = {
  path: string;
  auth: AuthRequirement;
  roles?: UserRole[];
};

type RouteWithTo<Params extends string[] = []> = RouteBase & {
  to: (...params: Params) => string;
};

export const ROUTES = {
  home: { path: '/', auth: 'public', to: () => '/' },
  products: { path: '/products', auth: 'public', to: () => '/products' },
  product: {
    path: '/product/[id]',
    auth: 'public',
    to: (id: string | number) => `/product/${id}`,
  },
  cart: { path: '/cart', auth: 'public', to: () => '/cart' },
  checkout: { path: '/checkout', auth: 'public', to: () => '/checkout' },
  payment: { path: '/payment', auth: 'public', to: () => '/payment' },

  profile: { path: '/profile', auth: 'protected', to: () => '/profile' },
  wishlist: { path: '/wishlist', auth: 'protected', to: () => '/wishlist' },

  login: { path: '/auth/login', auth: 'public', to: () => '/auth/login' },
  register: { path: '/auth/register', auth: 'public', to: () => '/auth/register' },
  forgotPassword: {
    path: '/auth/forgot-password',
    auth: 'public',
    to: () => '/auth/forgot-password',
  },
  updatePassword: {
    path: '/auth/update-password',
    auth: 'public', 
    to: () => '/auth/update-password',
  },
  authError: {
    path: '/auth/auth-code-error',
    auth: 'public',
    to: () => '/auth/auth-code-error',
  },

  faq: { path: '/faq', auth: 'public', to: () => '/faq' },
  blog: { path: '/blog', auth: 'public', to: () => '/blog' },
  blogPost: { path: '/blog/[slug]', auth: 'public', to: (slug: string) => `/blog/${slug}` },
} as const;

export const to = {
  home: ROUTES.home.to,
  products: ROUTES.products.to,
  product: ROUTES.product.to,
  cart: ROUTES.cart.to,
  checkout: ROUTES.checkout.to,
  payment: ROUTES.payment.to,
  profile: ROUTES.profile.to,
  wishlist: ROUTES.wishlist.to,
  
  login: ROUTES.login.to,
  register: ROUTES.register.to,
  forgotPassword: ROUTES.forgotPassword.to,
  updatePassword: ROUTES.updatePassword.to,
  authError: ROUTES.authError.to,

  faq: ROUTES.faq.to,
  blog: ROUTES.blog.to,
  blogPost: ROUTES.blogPost.to,
} as const;