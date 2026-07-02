import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CreditCard, Truck, ChevronRight, Lock } from 'lucide-react'
import { useStore } from '../store/useStore'
import { formatPrice, generateId } from '../lib/utils'
import { motion } from 'framer-motion'

export default function CheckoutPage() {
  const { cart, getCartTotal, clearCart, addOrder, user } = useStore()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('paystack')

  const [shippingData, setShippingData] = useState({
    fullName: user?.firstName + ' ' + (user?.lastName || '') || '',
    email: user?.email || '',
    phone: '',
    street: '',
    city: '',
    state: '',
    country: 'Nigeria',
    postalCode: '',
  })

  const total = getCartTotal()
  const shipping = total > 30000 ? 0 : 2500
  const finalTotal = total + shipping

  const handleShippingSubmit = (e) => {
    e.preventDefault()
    setStep(2)
  }

  const handlePayment = async () => {
    setIsProcessing(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    
    const order = {
      id: generateId(),
      userId: user?.id || 'guest',
      items: [...cart],
      total: finalTotal,
      status: 'pending',
      shippingAddress: {
        fullName: shippingData.fullName,
        phone: shippingData.phone,
        street: shippingData.street,
        city: shippingData.city,
        state: shippingData.state,
        country: shippingData.country,
        postalCode: shippingData.postalCode,
      },
      paymentMethod,
      createdAt: new Date().toISOString(),
    }
    
    addOrder(order)
    clearCart()
    setIsProcessing(false)
    navigate('/order-success', { state: { orderId: order.id } })
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="heading-display text-3xl mb-4">Your Cart is Empty</h1>
          <p className="text-bando-ash mb-6">Add some items to proceed to checkout</p>
          <button onClick={() => navigate('/shop')} className="btn-primary">Continue Shopping</button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="section-padding max-w-6xl mx-auto">
        <h1 className="heading-display text-3xl md:text-4xl mb-8">Checkout</h1>

        {/* Progress */}
        <div className="flex items-center gap-4 mb-10">
          <div className={`flex items-center gap-2 ${step >= 1 ? 'text-bando-gold' : 'text-bando-graphite'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 1 ? 'bg-bando-gold text-bando-black' : 'bg-bando-graphite'}`}>1</div>
            <span className="hidden sm:inline text-sm font-medium">Shipping</span>
          </div>
          <ChevronRight className="w-4 h-4 text-bando-graphite" />
          <div className={`flex items-center gap-2 ${step >= 2 ? 'text-bando-gold' : 'text-bando-graphite'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 2 ? 'bg-bando-gold text-bando-black' : 'bg-bando-graphite'}`}>2</div>
            <span className="hidden sm:inline text-sm font-medium">Payment</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            {step === 1 ? (
              <motion.form
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onSubmit={handleShippingSubmit}
                className="space-y-6"
              >
                <div className="bg-bando-charcoal/50 border border-bando-graphite/50 rounded-xl p-6">
                  <h2 className="font-display text-xl font-semibold mb-6 flex items-center gap-2">
                    <Truck className="w-5 h-5 text-bando-gold" /> Shipping Details
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name *</label>
                      <input
                        required
                        type="text"
                        value={shippingData.fullName}
                        onChange={(e) => setShippingData({ ...shippingData, fullName: e.target.value })}
                        className="w-full bg-bando-black border border-bando-graphite rounded-lg px-4 py-3 text-bando-white focus:border-bando-gold outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email *</label>
                      <input
                        required
                        type="email"
                        value={shippingData.email}
                        onChange={(e) => setShippingData({ ...shippingData, email: e.target.value })}
                        className="w-full bg-bando-black border border-bando-graphite rounded-lg px-4 py-3 text-bando-white focus:border-bando-gold outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone *</label>
                      <input
                        required
                        type="tel"
                        value={shippingData.phone}
                        onChange={(e) => setShippingData({ ...shippingData, phone: e.target.value })}
                        className="w-full bg-bando-black border border-bando-graphite rounded-lg px-4 py-3 text-bando-white focus:border-bando-gold outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Street Address *</label>
                      <input
                        required
                        type="text"
                        value={shippingData.street}
                        onChange={(e) => setShippingData({ ...shippingData, street: e.target.value })}
                        className="w-full bg-bando-black border border-bando-graphite rounded-lg px-4 py-3 text-bando-white focus:border-bando-gold outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">City *</label>
                      <input
                        required
                        type="text"
                        value={shippingData.city}
                        onChange={(e) => setShippingData({ ...shippingData, city: e.target.value })}
                        className="w-full bg-bando-black border border-bando-graphite rounded-lg px-4 py-3 text-bando-white focus:border-bando-gold outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">State *</label>
                      <input
                        required
                        type="text"
                        value={shippingData.state}
                        onChange={(e) => setShippingData({ ...shippingData, state: e.target.value })}
                        className="w-full bg-bando-black border border-bando-graphite rounded-lg px-4 py-3 text-bando-white focus:border-bando-gold outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn-primary w-full md:w-auto">
                  Continue to Payment
                </button>
              </motion.form>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="bg-bando-charcoal/50 border border-bando-graphite/50 rounded-xl p-6">
                  <h2 className="font-display text-xl font-semibold mb-6 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-bando-gold" /> Payment Method
                  </h2>
                  
                  <div className="space-y-4">
                    <button
                      onClick={() => setPaymentMethod('paystack')}
                      className={`w-full p-4 rounded-lg border-2 flex items-center gap-4 transition-all ${
                        paymentMethod === 'paystack'
                          ? 'border-bando-gold bg-bando-gold/10'
                          : 'border-bando-graphite hover:border-bando-ash'
                      }`}
                    >
                      <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                        <span className="text-bando-black font-bold text-xs">PS</span>
                      </div>
                      <div className="text-left">
                        <p className="font-semibold">Pay with Paystack</p>
                        <p className="text-sm text-bando-ash">Card, Bank Transfer, USSD</p>
                      </div>
                    </button>

                    <button
                      onClick={() => setPaymentMethod('flutterwave')}
                      className={`w-full p-4 rounded-lg border-2 flex items-center gap-4 transition-all ${
                        paymentMethod === 'flutterwave'
                          ? 'border-bando-gold bg-bando-gold/10'
                          : 'border-bando-graphite hover:border-bando-ash'
                      }`}
                    >
                      <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                        <span className="text-bando-black font-bold text-xs">FW</span>
                      </div>
                      <div className="text-left">
                        <p className="font-semibold">Pay with Flutterwave</p>
                        <p className="text-sm text-bando-ash">Card, Bank Transfer, Mobile Money</p>
                      </div>
                    </button>
                  </div>

                  <div className="mt-6 flex items-center gap-2 text-bando-ash text-sm">
                    <Lock className="w-4 h-4" />
                    <span>Your payment is secured with 256-bit SSL encryption</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button onClick={() => setStep(1)} className="btn-outline">
                    Back
                  </button>
                  <button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="btn-primary flex-1 flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-bando-black/30 border-t-bando-black rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>Pay {formatPrice(finalTotal)}</>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-bando-charcoal/50 border border-bando-graphite/50 rounded-xl p-6 sticky top-24">
              <h2 className="font-display text-lg font-semibold mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={`${item.product.id}-${item.size}-${item.color}`} className="flex gap-3">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-16 h-20 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.product.name}</p>
                      <p className="text-xs text-bando-ash">{item.color} / {item.size}</p>
                      <p className="text-xs text-bando-ash">Qty: {item.quantity}</p>
                      <p className="text-sm text-bando-gold font-semibold">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-bando-graphite pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-bando-ash">Subtotal</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-bando-ash">Shipping</span>
                  <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold pt-2 border-t border-bando-graphite">
                  <span>Total</span>
                  <span className="text-bando-gold">{formatPrice(finalTotal)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}