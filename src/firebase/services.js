import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth'
import { db, auth } from './config'

// ============================================
// PRODUCTS
// ============================================

export const getAllProducts = async () => {
  const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))
}

export const getProductById = async (productId) => {
  const docRef = doc(db, 'products', productId)
  const snapshot = await getDoc(docRef)
  if (!snapshot.exists()) return null
  return { id: snapshot.id, ...snapshot.data() }
}

export const getProductsByCategory = async (category) => {
  const q = query(
    collection(db, 'products'),
    where('category', '==', category),
    orderBy('createdAt', 'desc')
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))
}

export const addProduct = async (productData) => {
  // Strip 'id' if present — Firestore generates its own
  const { id, ...data } = productData
  return await addDoc(collection(db, 'products'), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
}

export const updateProduct = async (productId, updates) => {
  // CRITICAL: Strip 'id' from updates — Firestore rejects it
  const { id, ...cleanUpdates } = updates
  const docRef = doc(db, 'products', productId)
  await updateDoc(docRef, {
    ...cleanUpdates,
    updatedAt: serverTimestamp(),
  })
}

export const deleteProduct = async (productId) => {
  await deleteDoc(doc(db, 'products', productId))
}

export const declareSoldOut = async (productId) => {
  await updateDoc(doc(db, 'products', productId), {
    inStock: false,
    stockCount: 0,
    updatedAt: serverTimestamp(),
  })
}

// ============================================
// AUTHENTICATION
// ============================================

export const signupUser = async (email, password, firstName, lastName) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password)
  await updateProfile(userCredential.user, {
    displayName: `${firstName} ${lastName}`,
  })
  await setDoc(doc(db, 'users', userCredential.user.uid), {
    email,
    firstName,
    lastName,
    isAdmin: false,
    favorites: [],
    createdAt: serverTimestamp(),
  })
  return userCredential.user
}

// Regular user login
export const loginUser = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password)
  return userCredential.user
}

// ADMIN login — checks custom claim
export const loginAdmin = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password)
  
  // Force refresh to get latest custom claims
  const idTokenResult = await userCredential.user.getIdTokenResult(true)
  
  if (idTokenResult.claims?.admin !== true) {
    // Not an admin — sign them out immediately
    await signOut(auth)
    throw new Error('Access denied: This account is not authorized as admin.')
  }
  
  return userCredential.user
}

// Check if current user has admin claim
export const checkIsAdmin = async (user) => {
  if (!user) return false
  const idTokenResult = await user.getIdTokenResult(true)
  return idTokenResult.claims?.admin === true
}

export const logoutUser = async () => {
  await signOut(auth)
}

export const getCurrentUser = () => {
  return auth.currentUser
}

export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback)
}

export const getUserData = async (userId) => {
  const docRef = doc(db, 'users', userId)
  const snapshot = await getDoc(docRef)
  if (!snapshot.exists()) return null
  return { id: snapshot.id, ...snapshot.data() }
}

export const updateUserFavorites = async (userId, favorites) => {
  await updateDoc(doc(db, 'users', userId), {
    favorites,
    updatedAt: serverTimestamp(),
  })
}

// ============================================
// ORDERS
// ============================================

export const createOrder = async (orderData) => {
  return await addDoc(collection(db, 'orders'), {
    ...orderData,
    status: 'pending',
    paymentStatus: 'pending',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
}

export const getUserOrders = async (userId) => {
  const q = query(
    collection(db, 'orders'),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))
}

export const getAllOrders = async () => {
  const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))
}

export const updateOrderStatus = async (orderId, status) => {
  await updateDoc(doc(db, 'orders', orderId), {
    status,
    updatedAt: serverTimestamp(),
  })
}