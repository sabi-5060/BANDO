import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { products as initialProducts } from '../data/products'
import {
  onAuthChange,
  getUserData,
  updateUserFavorites,
  getAllProducts,
  addProduct as fbAddProduct,
  updateProduct as fbUpdateProduct,
  deleteProduct as fbDeleteProduct,
  declareSoldOut as fbDeclareSoldOut,
  signupUser,
  loginUser,
  logoutUser,
  createOrder as fbCreateOrder,
  getUserOrders as fbGetUserOrders,
  getAllOrders as fbGetAllOrders,
  updateOrderStatus as fbUpdateOrderStatus,
} from '../firebase/services'

const ADMIN_CREDENTIALS = {
  email: 'admin@bando.com',
  password: 'bando1944',
}

export const useStore = create(
  persist(
    (set, get) => ({
      // ─── PRODUCTS ───
      products: initialProducts,
      productsLoading: false,
      productsError: null,

      loadProducts: async () => {
        set({ productsLoading: true, productsError: null })
        try {
          const products = await getAllProducts()
          if (products.length > 0) {
            set({ products, productsLoading: false })
          }
        } catch (error) {
          console.error('Failed to load products:', error)
          set({ productsError: error.message, productsLoading: false })
        }
      },

      updateProduct: async (id, updates) => {
        try {
          await fbUpdateProduct(id, updates)
          set((state) => ({
            products: state.products.map((p) =>
              p.id === id ? { ...p, ...updates } : p
            ),
          }))
        } catch (error) {
          console.error('Failed to update product:', error)
        }
      },

      addProduct: async (product) => {
        try {
          const docRef = await fbAddProduct(product)
          const newProduct = { id: docRef.id, ...product }
          set((state) => ({
            products: [...state.products, newProduct],
          }))
          return docRef.id
        } catch (error) {
          console.error('Failed to add product:', error)
          return null
        }
      },

      deleteProduct: async (id) => {
        try {
          await fbDeleteProduct(id)
          set((state) => ({
            products: state.products.filter((p) => p.id !== id),
          }))
        } catch (error) {
          console.error('Failed to delete product:', error)
        }
      },

      declareSoldOut: async (id) => {
        try {
          await fbDeclareSoldOut(id)
          set((state) => ({
            products: state.products.map((p) =>
              p.id === id ? { ...p, inStock: false, stockCount: 0 } : p
            ),
          }))
        } catch (error) {
          console.error('Failed to declare sold out:', error)
        }
      },

      // ─── CART ───
      cart: [],
      addToCart: (item) =>
        set((state) => {
          const existing = state.cart.find(
            (i) =>
              i.product.id === item.product.id &&
              i.size === item.size &&
              i.color === item.color
          )
          if (existing) {
            return {
              cart: state.cart.map((i) =>
                i.product.id === item.product.id &&
                i.size === item.size &&
                i.color === item.color
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            }
          }
          return { cart: [...state.cart, item] }
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
          return total + item.product.price * item.quantity
        }, 0)
      },
      getCartCount: () => {
        return get().cart.reduce((count, item) => count + item.quantity, 0)
      },

      // ─── FAVORITES ───
      favorites: [],
      toggleFavorite: (productId) =>
        set((state) => {
          const isFav = state.favorites.includes(productId)
          const newFavorites = isFav
            ? state.favorites.filter((id) => id !== productId)
            : [...state.favorites, productId]
          // Sync to Firebase if user is logged in
          const { user } = state
          if (user?.uid && user.uid !== 'admin-1') {
            updateUserFavorites(user.uid, newFavorites).catch(console.error)
          }
          return { favorites: newFavorites }
        }),
      isFavorite: (productId) => {
        return get().favorites.includes(productId)
      },
      clearFavorites: () => set({ favorites: [] }),

      // ─── AUTH ───
      user: null,
      isAuthenticated: false,
      isAdmin: false,
      authLoading: true,

      initAuth: () => {
        const unsubscribe = onAuthChange(async (firebaseUser) => {
          if (firebaseUser) {
            try {
              const userData = await getUserData(firebaseUser.uid)
              set({
                user: {
                  uid: firebaseUser.uid,
                  email: firebaseUser.email,
                  firstName: userData?.firstName || firebaseUser.displayName?.split(' ')[0] || 'User',
                  lastName: userData?.lastName || firebaseUser.displayName?.split(' ')[1] || '',
                  isAdmin: userData?.isAdmin || false,
                },
                isAuthenticated: true,
                isAdmin: userData?.isAdmin || false,
                favorites: userData?.favorites || [],
                authLoading: false,
              })
            } catch (error) {
              console.error('Failed to load user data:', error)
              set({ authLoading: false })
            }
          } else {
            set({
              user: null,
              isAuthenticated: false,
              isAdmin: false,
              authLoading: false,
            })
          }
        })
        return unsubscribe
      },

      login: async (email, password) => {
        // Admin fallback (for demo/testing without Firebase Auth)
        if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
          set({
            user: {
              uid: 'admin-1',
              email: ADMIN_CREDENTIALS.email,
              firstName: 'BANDO',
              lastName: 'Admin',
              isAdmin: true,
            },
            isAuthenticated: true,
            isAdmin: true,
          })
          return true
        }

        try {
          const firebaseUser = await loginUser(email, password)
          const userData = await getUserData(firebaseUser.uid)
          set({
            user: {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              firstName: userData?.firstName || firebaseUser.displayName?.split(' ')[0] || 'User',
              lastName: userData?.lastName || firebaseUser.displayName?.split(' ')[1] || '',
              isAdmin: userData?.isAdmin || false,
            },
            isAuthenticated: true,
            isAdmin: userData?.isAdmin || false,
            favorites: userData?.favorites || [],
          })
          return true
        } catch (error) {
          console.error('Login failed:', error)
          // Fallback for demo without Firebase Auth set up
          if (email && password.length >= 6) {
            set({
              user: {
                uid: 'user-' + Date.now(),
                email,
                firstName: 'User',
                lastName: '',
                isAdmin: false,
              },
              isAuthenticated: true,
              isAdmin: false,
            })
            return true
          }
          return false
        }
      },

      signup: async (data) => {
        try {
          const firebaseUser = await signupUser(data.email, data.password, data.firstName, data.lastName)
          set({
            user: {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              firstName: data.firstName,
              lastName: data.lastName,
              isAdmin: false,
            },
            isAuthenticated: true,
            isAdmin: false,
            favorites: [],
          })
          return true
        } catch (error) {
          console.error('Signup failed:', error)
          // Fallback for demo
          set({
            user: {
              uid: 'user-' + Date.now(),
              email: data.email,
              firstName: data.firstName,
              lastName: data.lastName,
              isAdmin: false,
            },
            isAuthenticated: true,
            isAdmin: false,
          })
          return true
        }
      },

      logout: async () => {
        try {
          await logoutUser()
        } catch (error) {
          console.error('Logout error:', error)
        }
        set({
          user: null,
          isAuthenticated: false,
          isAdmin: false,
          cart: [],
          favorites: [],
        })
      },

      // ─── ORDERS ───
      orders: [],
      ordersLoading: false,

      loadOrders: async () => {
        const { user, isAdmin } = get()
        if (!user?.uid) return
        set({ ordersLoading: true })
        try {
          const orders = isAdmin
            ? await fbGetAllOrders()
            : await fbGetUserOrders(user.uid)
          set({ orders, ordersLoading: false })
        } catch (error) {
          console.error('Failed to load orders:', error)
          set({ ordersLoading: false })
        }
      },

      addOrder: async (order) => {
        const { user } = get()
        const orderWithUser = {
          ...order,
          userId: user?.uid || 'guest',
        }
        try {
          const docRef = await fbCreateOrder(orderWithUser)
          const newOrder = { id: docRef.id, ...orderWithUser }
          set((state) => ({
            orders: [newOrder, ...state.orders],
          }))
          return docRef.id
        } catch (error) {
          console.error('Failed to create order:', error)
          // Fallback: add to local state only
          const localOrder = { id: 'order-' + Date.now(), ...orderWithUser }
          set((state) => ({
            orders: [localOrder, ...state.orders],
          }))
          return localOrder.id
        }
      },

      updateOrderStatus: async (orderId, status) => {
        try {
          await fbUpdateOrderStatus(orderId, status)
          set((state) => ({
            orders: state.orders.map((o) =>
              o.id === orderId ? { ...o, status } : o
            ),
          }))
        } catch (error) {
          console.error('Failed to update order status:', error)
        }
      },

      // ─── UI ───
      isCartOpen: false,
      setCartOpen: (open) => set({ isCartOpen: open }),
      isMobileMenuOpen: false,
      setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),

      // ─── RESET ───
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
    }),
    {
      name: 'bando-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        cart: state.cart,
        favorites: state.favorites,
      }),
    }
  )
)