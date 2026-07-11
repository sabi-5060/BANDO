import { Link } from 'react-router-dom'
import { Shield, ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'

export default function PrivacyPolicyPage() {
  const sections = [
    {
      title: 'Information We Collect',
      content: [
        'Personal identification information: name, email address, phone number, and shipping address.',
        'Payment information: processed securely through Paystack and Flutterwave. We do not store your full card details.',
        'Order history: products purchased, dates, and amounts.',
        'Device and usage data: IP address, browser type, and pages visited to improve our service.',
      ],
    },
    {
      title: 'How We Use Your Information',
      content: [
        'To process and fulfill your orders, including shipping and delivery.',
        'To communicate with you about your orders, returns, and customer service inquiries.',
        'To send you marketing communications about new drops, sales, and BANDO news (only if you opt in).',
        'To improve our website, products, and customer experience through analytics.',
        'To comply with legal obligations and prevent fraud.',
      ],
    },
    {
      title: 'Information Sharing',
      content: [
        'We do not sell, trade, or rent your personal information to third parties.',
        'We share your information only with trusted service providers necessary to operate our business: payment processors (Paystack, Flutterwave), shipping couriers, and email service providers.',
        'These third parties are contractually obligated to protect your data and use it only for the services they provide to us.',
        'We may disclose information if required by law or to protect our rights and safety.',
      ],
    },
    {
      title: 'Data Security',
      content: [
        'We implement industry-standard security measures to protect your personal information.',
        'All payment transactions are encrypted using SSL/TLS technology.',
        'Access to personal data is restricted to authorized personnel only.',
        'While we strive to protect your data, no method of transmission over the internet is 100% secure.',
      ],
    },
    {
      title: 'Cookies & Tracking',
      content: [
        'We use cookies to enhance your browsing experience and remember your preferences.',
        'Analytics cookies help us understand how visitors interact with our website.',
        'Marketing cookies may be used to deliver relevant advertisements.',
        'You can disable cookies in your browser settings, though this may affect site functionality.',
      ],
    },
    {
      title: 'Your Rights',
      content: [
        'You have the right to access, correct, or delete your personal information.',
        'You can update your account details by logging into your BANDO account.',
        'To request deletion of your data, contact us at hello@bando.ng.',
        'You may opt out of marketing emails at any time by clicking the unsubscribe link.',
      ],
    },
    {
      title: 'Data Retention',
      content: [
        'We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy.',
        'Order records are kept for legal and accounting purposes for a minimum of 6 years.',
        'Inactive accounts may have personal data anonymized after 3 years of inactivity.',
      ],
    },
    {
      title: 'Changes to This Policy',
      content: [
        'We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements.',
        'Significant changes will be communicated via email or a prominent notice on our website.',
        'The effective date at the top of this page indicates when the policy was last updated.',
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
              <Shield className="w-5 h-5 text-bando-gold" />
            </div>
            <span className="text-bando-gold text-sm tracking-widest font-medium uppercase">Legal</span>
          </div>
          <h1 className="heading-display text-4xl md:text-5xl mb-4">Privacy Policy</h1>
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
            BANDO by Daniel Jobs (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting your privacy. 
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit 
            our website and make purchases from our store. By using our services, you consent to the practices described in this policy.
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
                {section.title}
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
          transition={{ delay: 0.6 }}
          className="mt-10 bg-bando-gold/5 border border-bando-gold/20 rounded-xl p-6 text-center"
        >
          <h3 className="font-display font-semibold mb-2">Questions About Your Privacy?</h3>
          <p className="text-bando-ash text-sm mb-3">
            If you have any questions or concerns about this Privacy Policy, please contact us.
          </p>
          <Link to="/contact" className="text-bando-gold hover:text-bando-gold-light text-sm font-medium">
            Contact Us →
          </Link>
        </motion.div>
      </div>
    </div>
  )
}