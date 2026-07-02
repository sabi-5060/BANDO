import { Link } from 'react-router-dom'
import { Crown, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-bando-charcoal border-t border-bando-graphite/50 mt-20">
      <div className="section-padding py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Crown className="w-6 h-6 text-bando-gold" />
              <span className="font-display text-lg font-bold tracking-wider">BANDO</span>
            </div>
            <p className="text-bando-ash text-sm leading-relaxed">
              Built on Truth. Designed for Change. Premium streetwear with purpose, honoring legacy and fighting for justice.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-bando-graphite rounded-full hover:bg-bando-gold hover:text-bando-black transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-bando-graphite rounded-full hover:bg-bando-gold hover:text-bando-black transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-bando-graphite rounded-full hover:bg-bando-gold hover:text-bando-black transition-all">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold mb-4 text-bando-white">Shop</h4>
            <ul className="space-y-2">
              <li><Link to="/shop?t=tshirts" className="text-bando-ash hover:text-bando-gold text-sm transition-colors">T-Shirts</Link></li>
              <li><Link to="/shop?t=polos" className="text-bando-ash hover:text-bando-gold text-sm transition-colors">Polos</Link></li>
              <li><Link to="/shop?t=jackets" className="text-bando-ash hover:text-bando-gold text-sm transition-colors">Jackets</Link></li>
              <li><Link to="/shop?t=accessories" className="text-bando-ash hover:text-bando-gold text-sm transition-colors">Accessories</Link></li>
              <li><Link to="/george-stinney" className="text-bando-gold hover:text-bando-gold-light text-sm transition-colors">George Stinney Collection</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4 text-bando-white">Company</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-bando-ash hover:text-bando-gold text-sm transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-bando-ash hover:text-bando-gold text-sm transition-colors">Contact</Link></li>
              <li><Link to="/shipping" className="text-bando-ash hover:text-bando-gold text-sm transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/privacy" className="text-bando-ash hover:text-bando-gold text-sm transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-bando-ash hover:text-bando-gold text-sm transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-bando-white">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-bando-ash text-sm">
                <MapPin className="w-4 h-4 text-bando-gold" />
                Lagos, Nigeria
              </li>
              <li className="flex items-center gap-2 text-bando-ash text-sm">
                <Phone className="w-4 h-4 text-bando-gold" />
                +234 800 BANDO NG
              </li>
              <li className="flex items-center gap-2 text-bando-ash text-sm">
                <Mail className="w-4 h-4 text-bando-gold" />
                hello@bando.ng
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-bando-graphite mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-bando-graphite text-xs">
            © 2024 BANDO. Built on Truth. Designed for Change.
          </p>
          <div className="flex gap-4 text-xs text-bando-graphite">
            <span>Paystack</span>
            <span>•</span>
            <span>Flutterwave</span>
            <span>•</span>
            <span>Secure Checkout</span>
          </div>
        </div>
      </div>
    </footer>
  )
}