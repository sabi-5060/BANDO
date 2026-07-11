import { Link } from 'react-router-dom'
import { 
  Truck, RotateCcw, Package, Clock, MapPin, 
  AlertCircle, CheckCircle, ArrowLeft
} from 'lucide-react'
import { motion } from 'framer-motion'

export default function ShippingReturnsPage() {
  const shippingZones = [
    {
      zone: 'Lagos (Metro)',
      time: '1 — 2 business days',
      cost: '₦2,500',
      freeThreshold: '₦30,000',
    },
    {
      zone: 'South-West Nigeria',
      time: '2 — 4 business days',
      cost: '₦3,500',
      freeThreshold: '₦30,000',
    },
    {
      zone: 'Abuja & North-Central',
      time: '3 — 5 business days',
      cost: '₦4,500',
      freeThreshold: '₦30,000',
    },
    {
      zone: 'South-East & South-South',
      time: '3 — 5 business days',
      cost: '₦4,500',
      freeThreshold: '₦30,000',
    },
    {
      zone: 'Northern Nigeria',
      time: '4 — 7 business days',
      cost: '₦5,500',
      freeThreshold: '₦30,000',
    },
  ]

  const returnSteps = [
    {
      icon: AlertCircle,
      title: 'Initiate Return',
      desc: 'Contact us within 14 days of delivery via email or WhatsApp with your order number and reason for return.',
    },
    {
      icon: Package,
      title: 'Package Item',
      desc: 'Place the item in its original packaging with all tags attached. Include the return slip if available.',
    },
    {
      icon: Truck,
      title: 'Ship Back',
      desc: 'Send the package to our Lagos address using any reliable courier. Return shipping is at your cost unless the item is defective.',
    },
    {
      icon: CheckCircle,
      title: 'Refund or Exchange',
      desc: 'Once received and inspected, we will process your refund to original payment method or ship your exchange within 3 business days.',
    },
  ]

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="section-padding">
        {/* Breadcrumb */}
        <Link to="/" className="inline-flex items-center gap-2 text-bando-ash hover:text-bando-gold mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mb-12"
        >
          <h1 className="heading-display text-4xl md:text-5xl mb-4">Shipping & Returns</h1>
          <p className="text-bando-ash text-lg leading-relaxed">
            We ship nationwide across Nigeria. Free shipping on orders over ₦30,000. 
            Not satisfied? We accept returns within 14 days.
          </p>
        </motion.div>

        {/* Shipping Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-bando-gold/10 rounded-lg flex items-center justify-center">
              <Truck className="w-5 h-5 text-bando-gold" />
            </div>
            <h2 className="font-display text-2xl font-semibold">Shipping Information</h2>
          </div>

          <div className="bg-bando-charcoal/50 border border-bando-graphite/50 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-bando-ash text-sm border-b border-bando-graphite bg-bando-black/30">
                    <th className="p-4 font-medium">Region</th>
                    <th className="p-4 font-medium">Delivery Time</th>
                    <th className="p-4 font-medium">Shipping Cost</th>
                    <th className="p-4 font-medium">Free Shipping Over</th>
                  </tr>
                </thead>
                <tbody>
                  {shippingZones.map((zone, i) => (
                    <tr 
                      key={i} 
                      className="border-b border-bando-graphite/30 hover:bg-bando-black/20 transition-colors"
                    >
                      <td className="p-4 text-bando-white font-medium">{zone.zone}</td>
                      <td className="p-4 text-bando-ash flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-bando-gold" />
                        {zone.time}
                      </td>
                      <td className="p-4 text-bando-white">{zone.cost}</td>
                      <td className="p-4 text-bando-gold font-medium">{zone.freeThreshold}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {[
              { icon: Package, title: 'Order Processing', desc: 'Orders are processed within 24 hours on business days.' },
              { icon: MapPin, title: 'Tracking', desc: 'You will receive a tracking number via email once your order ships.' },
              { icon: Truck, title: 'Courier Partners', desc: 'We partner with trusted local couriers for reliable delivery.' },
            ].map((item) => (
              <div key={item.title} className="bg-bando-charcoal/30 border border-bando-graphite/30 rounded-lg p-5">
                <item.icon className="w-5 h-5 text-bando-gold mb-2" />
                <h4 className="font-medium text-sm mb-1">{item.title}</h4>
                <p className="text-bando-ash text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Returns Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-bando-gold/10 rounded-lg flex items-center justify-center">
              <RotateCcw className="w-5 h-5 text-bando-gold" />
            </div>
            <h2 className="font-display text-2xl font-semibold">Returns & Exchanges</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {returnSteps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="bg-bando-charcoal/50 border border-bando-graphite/50 rounded-xl p-6 flex gap-4"
              >
                <div className="w-10 h-10 bg-bando-black rounded-lg flex items-center justify-center shrink-0">
                  <step.icon className="w-5 h-5 text-bando-gold" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-bando-gold font-bold">Step {i + 1}</span>
                    <h4 className="font-semibold text-bando-white">{step.title}</h4>
                  </div>
                  <p className="text-bando-ash text-sm leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Return Policy Notes */}
          <div className="bg-bando-black/30 border border-bando-graphite/50 rounded-xl p-6">
            <h3 className="font-display font-semibold mb-4">Return Policy</h3>
            <ul className="space-y-3">
              {[
                'Items must be unworn, unwashed, and with original tags attached.',
                'George Stinney Collection items are final sale and cannot be returned.',
                'Intimates and accessories cannot be returned for hygiene reasons.',
                'Refunds are processed to the original payment method within 5 — 7 business days.',
                'Exchanges are subject to stock availability.',
                'Return shipping costs are the responsibility of the customer unless the item is defective or incorrect.',
              ].map((rule, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-bando-ash">
                  <span className="text-bando-gold mt-0.5">•</span>
                  {rule}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  )
}