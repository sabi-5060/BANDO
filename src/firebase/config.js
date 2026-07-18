import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// ============================================
// BANDO Firebase Configuration
// ============================================
const firebaseConfig = {
  apiKey: "AIzaSyD24FLJxgoyFK5ct7zsTb8iPxFF_IKgrVo",
  authDomain: "bando-48b4a.firebaseapp.com",
  projectId: "bando-48b4a",
  storageBucket: "bando-48b4a.firebasestorage.app",
  messagingSenderId: "841166104164",
  appId: "1:841166104164:web:6dd88acf8f185a089aa171"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Export services
export const db = getFirestore(app)
export const auth = getAuth(app)

export default app
