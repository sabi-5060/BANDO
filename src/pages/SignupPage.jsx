import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Crown, Eye, EyeOff, ArrowRight } from 'lucide-react'
import { useStore } from '../store/useStore'
import { motion } from 'framer-motion'

// Simple inline Google "G" logo — avoids pulling in an extra icon package
function GoogleIcon(props) {
  return (
    <svg viewBox="0 0 48 48" width="20" height="20" {...props}>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 3l6-6C33.5 5.1 29 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21c0-1.4-.1-2.4-.4-3.5z"/>
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.8 1.1 8 3l6-6C33.5 5.1 29 3 24 3 16.3 3 9.6 7.3 6.3 14.7z"/>
      <path fill="#4CAF50" d="M24 45c5 0 9.5-1.9 12.9-5.1l-6-5c-2 1.4-4.7 2.2-6.9 2.2-5.3 0-9.7-3.4-11.3-8l-6.6 5C9.5 40.6 16.2 45 24 45z"/>
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4.1 5.4l6 5C40.7 35.4 44 30.2 44 24c0-1.4-.1-2.4-.4-3.5z"/>
    </svg>
  )
}

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const { signup, loginWithGoogle } = useStore()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setIsLoading(true)
    const success = await signup({
      email: formData.email,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
    })

    if (success) {
      navigate('/')
    }
    setIsLoading(false)
  }

  const handleGoogleSignup = async () => {
    setError('')
    setIsGoogleLoading(true)
    const success = await loginWithGoogle()
    if (success) {
      navigate('/')
    } else {
      setError('Google sign-in failed. Please try again.')
    }
    setIsGoogleLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 pb-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-10">
          <Crown className="w-12 h-12 text-bando-gold mx-auto mb-4" />
          <h1 className="heading-display text-3xl mb-2">Join BANDO</h1>
          <p className="text-bando-ash">Create your account to start shopping</p>
        </div>

        <div className="bg-bando-charcoal/50 border border-bando-graphite/50 rounded-2xl p-8">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}

          <button
            type="button"
            onClick={handleGoogleSignup}
            disabled={isGoogleLoading}
            className="w-full flex items-center justify-center gap-3 bg-bando-black border border-bando-graphite rounded-lg px-4 py-3 text-bando-white hover:border-bando-gold transition-colors mb-6 disabled:opacity-60"
          >
            {isGoogleLoading ? (
              <div className="w-5 h-5 border-2 border-bando-white/30 border-t-bando-white rounded-full animate-spin" />
            ) : (
              <>
                <GoogleIcon />
                <span className="text-sm font-medium">Continue with Google</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-bando-graphite/50" />
            <span className="text-xs text-bando-ash uppercase tracking-wide">or sign up with email</span>
            <div className="flex-1 h-px bg-bando-graphite/50" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">First Name</label>
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full bg-bando-black border border-bando-graphite rounded-lg px-4 py-3 text-bando-white focus:border-bando-gold outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Last Name</label>
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full bg-bando-black border border-bando-graphite rounded-lg px-4 py-3 text-bando-white focus:border-bando-gold outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-bando-black border border-bando-graphite rounded-lg px-4 py-3 text-bando-white focus:border-bando-gold outline-none transition-colors"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-bando-black border border-bando-graphite rounded-lg px-4 py-3 pr-12 text-bando-white focus:border-bando-gold outline-none transition-colors"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-bando-ash hover:text-bando-white"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Confirm Password</label>
              <input
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full bg-bando-black border border-bando-graphite rounded-lg px-4 py-3 text-bando-white focus:border-bando-gold outline-none transition-colors"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-start gap-2">
              <input type="checkbox" required className="mt-1 rounded border-bando-graphite bg-bando-black text-bando-gold focus:ring-bando-gold" />
              <span className="text-xs text-bando-ash">
                I agree to the <Link to="/terms" className="text-bando-gold">Terms of Service</Link> and{' '}
                <Link to="/privacy" className="text-bando-gold">Privacy Policy</Link>
              </span>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-bando-black/30 border-t-bando-black rounded-full animate-spin" />
              ) : (
                <>Create Account <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-bando-ash text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-bando-gold hover:text-bando-gold-light font-medium transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
