// src/components/AdminRoute.jsx
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function AdminRoute({ children }) {
  const { user, isAdmin, loading } = useAuth()

  // Still checking auth state
  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
        <div className="animate-pulse text-neutral-400">Loading...</div>
      </div>
    )
  }

  // Not logged in at all → send to your existing login page
  if (!user) {
    return <Navigate to="/login" replace />
  }

  // Logged in but not admin → send to home (or wherever)
  if (!isAdmin) {
    return <Navigate to="/" replace />
  }

  // Is admin → render the protected content
  return children
}