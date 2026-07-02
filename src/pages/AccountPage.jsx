import { useNavigate } from 'react-router-dom'
import { User, Package, MapPin, LogOut, Crown } from 'lucide-react'
import { useStore } from '../store/useStore'
import { formatPrice, formatDate } from '../lib/utils'
import { motion } from 'framer-motion'

export default function AccountPage() {
  const { user, logout, orders } = useStore()
  const navigate = useNavigate()

  if (!user) {
    navigate('/login')
    return null
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="section-padding max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Profile Header */}
          <div className="bg-bando-charcoal/50 border border-bando-graphite/50 rounded-2xl p-8 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-bando-gold rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-bando-black" />
              </div>
              <div>
                <h1 className="heading-display text-2xl">{user.firstName} {user.lastName}</h1>
                <p className="text-bando-ash">{user.email}</p>
                {user.isAdmin && (
                  <span className="inline-block mt-1 bg-bando-gold/20 text-bando-gold text-xs font-bold px-2 py-0.5 rounded">
                    ADMIN
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-bando-charcoal/50 border border-bando-graphite/50 rounded-xl p-6 text-center">
              <Package className="w-6 h-6 text-bando-gold mx-auto mb-2" />
              <p className="text-2xl font-bold">{orders.length}</p>
              <p className="text-bando-ash text-sm">Total Orders</p>
            </div>
            <div className="bg-bando-charcoal/50 border border-bando-graphite/50 rounded-xl p-6 text-center">
              <Crown className="w-6 h-6 text-bando-gold mx-auto mb-2" />
              <p className="text-2xl font-bold">{orders.filter(o => o.status === 'delivered').length}</p>
              <p className="text-bando-ash text-sm">Delivered</p>
            </div>
            <div className="bg-bando-charcoal/50 border border-bando-graphite/50 rounded-xl p-6 text-center">
              <MapPin className="w-6 h-6 text-bando-gold mx-auto mb-2" />
              <p className="text-2xl font-bold">{orders.length > 0 ? '1' : '0'}</p>
              <p className="text-bando-ash text-sm">Saved Addresses</p>
            </div>
          </div>

          {/* Order History */}
          <div className="bg-bando-charcoal/50 border border-bando-graphite/50 rounded-2xl p-8">
            <h2 className="font-display text-xl font-semibold mb-6 flex items-center gap-2">
              <Package className="w-5 h-5 text-bando-gold" /> Order History
            </h2>
            
            {orders.length === 0 ? (
              <div className="text-center py-8">
                <Package className="w-12 h-12 text-bando-graphite mx-auto mb-4" />
                <p className="text-bando-ash">No orders yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="bg-bando-black/30 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-mono text-sm text-bando-ash">{order.id.slice(0, 12)}</p>
                        <p className="text-xs text-bando-graphite">{formatDate(order.createdAt)}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{formatPrice(order.total)}</p>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          order.status === 'delivered' ? 'bg-green-500/20 text-green-400' :
                          order.status === 'shipped' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {order.items.map((item, i) => (
                        <img
                          key={i}
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Logout */}
          <button
            onClick={() => {
              logout()
              navigate('/')
            }}
            className="mt-8 w-full flex items-center justify-center gap-2 text-red-400 hover:text-red-300 py-4 border border-red-400/30 rounded-xl hover:bg-red-400/10 transition-all"
          >
            <LogOut className="w-5 h-5" /> Sign Out
          </button>
        </motion.div>
      </div>
    </div>
  )
}