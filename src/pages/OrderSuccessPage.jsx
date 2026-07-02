import { useLocation, useNavigate, Link } from 'react-router-dom'
import { CheckCircle, Package, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

export default function OrderSuccessPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const orderId = location.state?.orderId

  if (!orderId) {
    navigate('/')
    return null
  }

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full text-center"
      >
        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-400" />
        </div>
        
        <h1 className="heading-display text-3xl mb-4">Order Confirmed!</h1>
        <p className="text-bando-ash mb-2">
          Thank you for your purchase. Your order has been received and is being processed.
        </p>
        <p className="font-mono text-sm text-bando-gold mb-8">
          Order ID: {orderId.slice(0, 16)}
        </p>

        <div className="bg-bando-charcoal/50 border border-bando-graphite/50 rounded-xl p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Package className="w-5 h-5 text-bando-gold" />
            <span className="font-medium">What happens next?</span>
          </div>
          <ul className="text-left text-sm text-bando-ash space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-bando-gold">1.</span> You'll receive a confirmation email shortly
            </li>
            <li className="flex items-start gap-2">
              <span className="text-bando-gold">2.</span> We'll process and ship your order within 1-2 business days
            </li>
            <li className="flex items-start gap-2">
              <span className="text-bando-gold">3.</span> You'll receive tracking info once shipped
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <Link to="/account" className="btn-primary flex items-center justify-center gap-2">
            View My Orders <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/shop" className="btn-outline">
            Continue Shopping
          </Link>
        </div>
      </motion.div>
    </div>
  )
}