import { Link } from 'react-router-dom'
import { FileText, ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'

export default function TermsOfServicePage() {
  const sections = [
    {
      title: 'Acceptance of Terms',
      content: [
        'By accessing and using the BANDO website, you agree to be bound by these Terms of Service and all applicable laws and regulations.',
        'If you do not agree with any of these terms, you are prohibited from using or accessing this site.',
        'We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting.',
        'Continued use of the website after changes constitutes acceptance of the revised terms.',
      ],
    },
    {
      title: 'Use of the Website',
      content: [
        'You must be at least 16 years of age to make purchases on this website.',
        'You agree to provide accurate, current, and complete information during registration and checkout.',
        'You are responsible for maintaining the confidentiality of your account credentials.',
        'You agree not to use the website for any unlawful purpose or to transmit any harmful code or malware.',
        'We reserve the right to terminate or suspend your account for violation of these terms.',
      ],
    },
    {
      title: 'Products & Pricing',
      content: [
        'All products are subject to availability. We reserve the right to discontinue any product at any time.',
        'Prices are listed in Nigerian Naira (₦) and are inclusive of applicable taxes unless otherwise stated.',
        'We make every effort to display accurate product colors, but actual colors may vary depending on your device.',
        'We reserve the right to correct pricing errors and will notify you before processing orders with incorrect prices.',
        'Product descriptions and specifications are provided by the manufacturer and are believed to be accurate.',
      ],
    },
    {
      title: 'Orders & Payment',
      content: [
        'Placing an order constitutes an offer to purchase, which we may accept or decline at our discretion.',
        'Payment must be made in full at the time of order via Paystack or Flutterwave.',
        'We use secure third-party payment processors. We do not store your full card details.',
        'Orders are confirmed via email. If you do not receive a confirmation, please contact us.',
        'We reserve the right to cancel orders due to stock unavailability, pricing errors, or suspected fraud.',
      ],
    },
    {
      title: 'Shipping & Delivery',
      content: [
        'Delivery times are estimates and not guaranteed. Delays may occur due to circumstances beyond our control.',
        'Risk of loss and title for items pass to you upon delivery to the shipping address provided.',
        'You are responsible for providing accurate shipping information. We are not liable for failed delivery due to incorrect addresses.',
        'If a package is returned to us due to failed delivery attempts, you may be charged for re-shipping.',
      ],
    },
    {
      title: 'Returns & Refunds',
      content: [
        'Returns are accepted within 14 days of delivery for unworn items with original tags attached.',
        'George Stinney Collection items, intimates, and accessories are final sale and cannot be returned.',
        'Refunds are processed to the original payment method within 5 — 7 business days of receiving the returned item.',
        'Original shipping costs are non-refundable unless the return is due to our error.',
        'We reserve the right to refuse returns that do not meet our policy requirements.',
      ],
    },
    {
      title: 'Intellectual Property',
      content: [
        'All content on this website, including text, graphics, logos, images, and software, is the property of BANDO by Daniel Jobs.',
        'The BANDO name, logo, and all related marks are trademarks owned by us.',
        'You may not reproduce, distribute, modify, or create derivative works from any content without our express written permission.',
        'Unauthorized use of our intellectual property may result in legal action.',
      ],
    },
    {
      title: 'Limitation of Liability',
      content: [
        'BANDO by Daniel Jobs shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the website or products.',
        'Our total liability shall not exceed the amount you paid for the specific product giving rise to the claim.',
        'We do not warrant that the website will be uninterrupted, error-free, or free of viruses.',
        'Some jurisdictions do not allow the exclusion of certain warranties or limitations of liability, so the above may not apply to you.',
      ],
    },
    {
      title: 'Governing Law',
      content: [
        'These Terms of Service shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria.',
        'Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of Lagos State, Nigeria.',
        'If any provision of these terms is found to be invalid or unenforceable, the remaining provisions shall continue in full force.',
      ],
    },
  ]

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="section-padding max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <Link to="/" className="inline-flex items-center gap-2 text-bando-ash hover:text-bando-gold mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-bando-gold/10 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-bando-gold" />
            </div>
            <span className="text-bando-gold text-sm tracking-widest font-medium uppercase">Legal</span>
          </div>
          <h1 className="heading-display text-4xl md:text-5xl mb-4">Terms of Service</h1>
          <p className="text-bando-ash">
            Effective Date: July 10, 2026 | Last Updated: July 10, 2026
          </p>
        </motion.div>

        {/* Intro */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-bando-charcoal/50 border border-bando-graphite/50 rounded-xl p-6 mb-8"
        >
          <p className="text-bando-ash leading-relaxed">
            Welcome to BANDO by Daniel Jobs. These Terms of Service govern your use of our website, 
            products, and services. Please read them carefully before making a purchase or creating an account. 
            By using our services, you agree to these terms in full.
          </p>
        </motion.div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((section, i) => (
            <motion.section
              key={section.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.05 }}
              className="bg-bando-charcoal/30 border border-bando-graphite/30 rounded-xl p-6"
            >
              <h2 className="font-display text-xl font-semibold mb-4 text-bando-white">
                {i + 1}. {section.title}
              </h2>
              <ul className="space-y-3">
                {section.content.map((item, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm text-bando-ash leading-relaxed">
                    <span className="text-bando-gold mt-0.5 shrink-0">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.section>
          ))}
        </div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-10 bg-bando-gold/5 border border-bando-gold/20 rounded-xl p-6 text-center"
        >
          <h3 className="font-display font-semibold mb-2">Questions About These Terms?</h3>
          <p className="text-bando-ash text-sm mb-3">
            If you have any questions about these Terms of Service, please reach out to us.
          </p>
          <Link to="/contact" className="text-bando-gold hover:text-bando-gold-light text-sm font-medium">
            Contact Us →
          </Link>
        </motion.div>
      </div>
    </div>
  )
}