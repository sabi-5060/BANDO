import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { products as initialProducts } from '../data/products';

const ADMIN_CREDENTIALS = {
  email: 'admin@bando.com',
  password: 'bando1944',
};

export const useStore = create(
  persist(
    (set, get) => ({
      // Products
      products: initialProducts,
      updateProduct: (id, updates) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          ),
        })),
      addProduct: (product) =>
        set((state) => ({
          products: [...state.products, product],
        })),
      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        })),
      declareSoldOut: (id) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, inStock: false, stockCount: 0 } : p
          ),
        })),
      
      // Cart
      cart: [],
      addToCart: (item) =>
        set((state) => {
          const existing = state.cart.find(
            (i) =>
              i.product.id === item.product.id &&
              i.size === item.size &&
              i.color === item.color
          );
          if (existing) {
            return {
              cart: state.cart.map((i) =>
                i.product.id === item.product.id &&
                i.size === item.size &&
                i.color === item.color
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }
          return { cart: [...state.cart, item] };
        }),
      removeFromCart: (productId, size, color) =>
        set((state) => ({
          cart: state.cart.filter(
            (i) =>
              !(
                i.product.id === productId &&
                i.size === size &&
                i.color === color
              )
          ),
        })),
      updateCartQuantity: (productId, size, color, quantity) =>
        set((state) => ({
          cart: state.cart.map((i) =>
            i.product.id === productId &&
            i.size === size &&
            i.color === color
              ? { ...i, quantity }
              : i
          ),
        })),
      clearCart: () => set({ cart: [] }),
      getCartTotal: () => {
        return get().cart.reduce((total, item) => {
          return total + item.product.price * item.quantity;
        }, 0);
      },
      getCartCount: () => {
        return get().cart.reduce((count, item) => count + item.quantity, 0);
      },
      
      // Favorites / Wishlist
      favorites: [],
      toggleFavorite: (productId) =>
        set((state) => {
          const isFav = state.favorites.includes(productId);
          return {
            favorites: isFav
              ? state.favorites.filter((id) => id !== productId)
              : [...state.favorites, productId],
          };
        }),
      isFavorite: (productId) => {
        return get().favorites.includes(productId);
      },
      clearFavorites: () => set({ favorites: [] }),
      
      // Auth
      user: null,
      isAuthenticated: false,
      isAdmin: false,
      login: async (email, password) => {
        await new Promise((resolve) => setTimeout(resolve, 800));
        
        if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
          set({
            user: {
              id: 'admin-1',
              email: ADMIN_CREDENTIALS.email,
              firstName: 'BANDO',
              lastName: 'Admin',
              isAdmin: true,
            },
            isAuthenticated: true,
            isAdmin: true,
          });
          return true;
        }
        
        if (email && password.length >= 6) {
          set({
            user: {
              id: 'user-' + Date.now(),
              email,
              firstName: 'User',
              lastName: '',
              isAdmin: false,
            },
            isAuthenticated: true,
            isAdmin: false,
          });
          return true;
        }
        
        return false;
      },
      signup: async (data) => {
        await new Promise((resolve) => setTimeout(resolve, 800));
        set({
          user: {
            id: 'user-' + Date.now(),
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            isAdmin: false,
          },
          isAuthenticated: true,
          isAdmin: false,
        });
        return true;
      },
      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
          isAdmin: false,
          cart: [],
        }),
      
      // Reset store (for debugging)
      resetStore: () =>
        set({
          products: initialProducts,
          cart: [],
          user: null,
          isAuthenticated: false,
          isAdmin: false,
          orders: [],
          isCartOpen: false,
          isMobileMenuOpen: false,
          favorites: [],
        }),
      
      // Orders
      orders: [],
      addOrder: (order) =>
        set((state) => ({
          orders: [order, ...state.orders],
        })),
      updateOrderStatus: (orderId, status) =>
        set((state) => ({
          orders: state.orders.map((o) =>
            o.id === orderId ? { ...o, status } : o
          ),
        })),
      
      // UI
      isCartOpen: false,
      setCartOpen: (open) => set({ isCartOpen: open }),
      isMobileMenuOpen: false,
      setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
    }),
    {
      name: 'bando-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        cart: state.cart,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        isAdmin: state.isAdmin,
        orders: state.orders,
        products: state.products,
        favorites: state.favorites,
      }),
    }
  )
);