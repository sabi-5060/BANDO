import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { products as initialProducts } from '../data/products'
import {
  onAuthChange,
  getUserData,
  updateUserFavorites,
  subscribeToProducts,
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
  signInWithGoogle,
} from '../firebase/services'

export const useStore = create(
  persist(
    (set, get) => ({
      // ─── PRODUCTS ───
      products: initialProducts,
      productsLoading: false,
      productsError: null,
      _unsubProducts: null,

      // Live subscription — call once on app mount (see App.jsx).
      // Every device gets pushed updates automatically, no reload needed.
      subscribeToProducts: () => {
        // Avoid double-subscribing if called more than once
        const existing = get()._unsubProducts
        if (existing) existing()

        set({ productsLoading: true, productsError: null })

        const unsubscribe = subscribeToProducts(
          (products) => {
            if (products.length > 0) {
              set({ products, productsLoading: false })
            } else {
              // Firestore empty — keep local fallback list visible
              set({ productsLoading: false })
            }
          },
          (error) => {
            console.error('Product subscription failed:', error)
            set({ productsError: error.message, productsLoading: false })
          }
        )

        set({ _unsubProducts: unsubscribe })
        return unsubscribe
      },

      unsubscribeFromProducts: () => {
        const unsub = get()._unsubProducts
        if (unsub) {
          unsub()
          set({ _unsubProducts: null })
        }
      },

      // Writes go straight to Firestore. No optimistic local mutation —
      // the onSnapshot listener above will update `products` for us
      // once the write lands, on THIS device and every other one.
      updateProduct: async (id, updates) => {
        try {
          await fbUpdateProduct(id, updates)
        } catch (error) {
          console.error('Firestore update failed:', error.message)
          throw error // let the UI (admin dashboard) know it failed
        }
      },

      addProduct: async (product) => {
        try {
          const docRef = await fbAddProduct(product)
          return docRef.id
        } catch (error) {
          console.error('Firestore add failed:', error.message)
          throw error
        }
      },

      deleteProduct: async (id) => {
        try {
          await fbDeleteProduct(id)
        } catch (error) {
          console.error('Firestore delete failed:', error.message)
          throw error
        }
      },

      declareSoldOut: async (id) => {
        try {
          await fbDeclareSoldOut(id)
        } catch (error) {
          console.error('Firestore declareSoldOut failed:', error.message)
          throw error
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
          const { user } = state
          if (user?.uid) {
            updateUserFavorites(user.uid, newFavorites).catch(console.error)
          }
          return { favorites: newFavorites }
        }),
      isFavorite: (productId) => {
        return get().favorites.includes(productId)
      },
      clearFavorites: () => set({ favorites: [] }),

      // ─── AUTH ───
      // NOTE: There is no hardcoded admin fallback anymore. Admin status
      // now comes ONLY from a real Firebase Auth custom claim (admin: true),
      // set via the Admin SDK script. This matches your Firestore rules,
      // which check request.auth.token.admin == true.
      user: null,
      isAuthenticated: false,
      isAdmin: false,
      authLoading: true,

      initAuth: () => {
        const unsubscribe = onAuthChange(async (firebaseUser) => {
          if (firebaseUser) {
            try {
              // Force-refresh the token so newly-set custom claims
              // (like admin: true) are picked up, not a stale cached token.
              const tokenResult = await firebaseUser.getIdTokenResult(true)
              const isAdmin = tokenResult.claims.admin === true

              const userData = await getUserData(firebaseUser.uid)
              set({
                user: {
                  uid: firebaseUser.uid,
                  email: firebaseUser.email,
                  firstName:
                    userData?.firstName ||
                    firebaseUser.displayName?.split(' ')[0] ||
                    'User',
                  lastName:
                    userData?.lastName ||
                    firebaseUser.displayName?.split(' ')[1] ||
                    '',
                  isAdmin,
                },
                isAuthenticated: true,
                isAdmin,
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
        try {
          const firebaseUser = await loginUser(email, password)
          const tokenResult = await firebaseUser.getIdTokenResult(true)
          const isAdmin = tokenResult.claims.admin === true
          const userData = await getUserData(firebaseUser.uid)

          set({
            user: {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              firstName:
                userData?.firstName ||
                firebaseUser.displayName?.split(' ')[0] ||
                'User',
              lastName:
                userData?.lastName ||
                firebaseUser.displayName?.split(' ')[1] ||
                '',
              isAdmin,
            },
            isAuthenticated: true,
            isAdmin,
            favorites: userData?.favorites || [],
          })
          return true
        } catch (error) {
          console.error('Login failed:', error.message)
          return false
        }
      },

      signup: async (data) => {
        try {
          const firebaseUser = await signupUser(
            data.email,
            data.password,
            data.firstName,
            data.lastName
          )
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
          console.error('Signup failed:', error.message)
          return false
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

      // ─── GOOGLE SIGN-IN (popup-based) ───
      // Returns true/false directly — the caller (LoginPage/SignupPage)
      // can navigate immediately based on the result, no page reload involved.
      loginWithGoogle: async () => {
        try {
          const firebaseUser = await signInWithGoogle()
          const tokenResult = await firebaseUser.getIdTokenResult(true)
          const isAdmin = tokenResult.claims.admin === true
          const userData = await getUserData(firebaseUser.uid)

          set({
            user: {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              firstName:
                userData?.firstName ||
                firebaseUser.displayName?.split(' ')[0] ||
                'User',
              lastName:
                userData?.lastName ||
                firebaseUser.displayName?.split(' ')[1] ||
                '',
              isAdmin,
            },
            isAuthenticated: true,
            isAdmin,
            favorites: userData?.favorites || [],
          })
          return true
        } catch (error) {
          // Common benign case: user closed the Google popup themselves
          if (error.code === 'auth/popup-closed-by-user') {
            return false
          }
          console.error('Google login failed:', error.message)
          return false
        }
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
        const docRef = await fbCreateOrder(orderWithUser)
        const newOrder = { id: docRef.id, ...orderWithUser }
        set((state) => ({
          orders: [newOrder, ...state.orders],
        }))
        return docRef.id
      },

      updateOrderStatus: async (orderId, status) => {
        await fbUpdateOrderStatus(orderId, status)
        set((state) => ({
          orders: state.orders.map((o) =>
            o.id === orderId ? { ...o, status } : o
          ),
        }))
      },

      // ─── UI ───
      isCartOpen: false,
      setCartOpen: (open) => set({ isCartOpen: open }),
      isMobileMenuOpen: false,
      setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),

      // ─── RESET ───
      resetStore: () => {
        get().unsubscribeFromProducts?.()
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
        })
      },
    }),
    {
      name: 'bando-store',
      storage: createJSONStorage(() => localStorage),
      // Only cart + favorites persist locally. Products and auth
      // ALWAYS come from Firestore/Firebase Auth — never from
      // localStorage — so every device stays in sync.
      partialize: (state) => ({
        cart: state.cart,
        favorites: state.favorites,
      }),
    }
  )
)
