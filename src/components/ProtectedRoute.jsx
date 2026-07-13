import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children, requireAdmin = false }) {
  const { user, isAdmin, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-bando-black flex items-center justify-center">
        <div className="animate-pulse text-bando-ash">Loading...</div>
      </div>
    )
  }

  // Not logged in at all → login page
  if (!user) {
    return <Navigate to="/login" replace />
  }

  // Logged in but needs admin and isn't → home page
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />
  }

  return children
}