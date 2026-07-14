import { createContext, useContext, useState, useEffect } from 'react'
import { onAuthChange, checkIsAdmin, logoutUser } from '../firebase/services'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthChange(async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser)
        // Check admin claim
        const adminStatus = await checkIsAdmin(firebaseUser)
        setIsAdmin(adminStatus)
      } else {
        setUser(null)
        setIsAdmin(false)
      }
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    user,
    isAdmin,
    isAuthenticated: !!user,
    loading,
    logout: logoutUser,
  }

  // Don't render children until auth state is determined
  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}