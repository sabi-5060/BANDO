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
  onSnapshot,
} from 'firebase/firestore'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'
import { db, auth } from './config'

const googleProvider = new GoogleAuthProvider()

export const subscribeToProducts = (callback) => {
  const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'))
  return onSnapshot(q, (snapshot) => {
    const products = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    callback(products)
  })
}

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
  return await addDoc(collection(db, 'products'), {
    ...productData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
}

export const updateProduct = async (productId, updates) => {
  const docRef = doc(db, 'products', productId)
  await updateDoc(docRef, {
    ...updates,
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
  // Create user document in Firestore
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

export const loginUser = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password)
  return userCredential.user
}

export const logoutUser = async () => {
  await signOut(auth)
}

// Popup-based Google sign-in. Must be called synchronously in response to a
// user click (no await before it in the caller) or browsers may block it.
export const signInWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider)
  const user = result.user
  const isNewUser =
    user.metadata.creationTime === user.metadata.lastSignInTime

  // Create a users/{uid} doc the first time this Google account signs in,
  // same shape as your email/password signup creates.
  if (isNewUser) {
    const nameParts = (user.displayName || '').split(' ')
    await setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      firstName: nameParts[0] || 'User',
      lastName: nameParts.slice(1).join(' ') || '',
      isAdmin: false,
      favorites: [],
      createdAt: serverTimestamp(),
    })
  }

  return user
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
