import Link from 'next/link'
import { Crown, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-earth-500 text-ivory mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Crown className="w-8 h-8 text-yellow-300" />
              <h3 className="font-heading text-xl font-bold">Asakia Hanan</h3>
            </div>
            <p className="text-earth-200 text-sm">
              Cultural Ambassador & Women Empowerment Advocate
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'About', 'Gallery', 'Partners', 'Press', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="text-earth-200 hover:text-yellow-300 transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-yellow-300" />
                <span className="text-earth-200 text-sm">contact@asakiahanan.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-yellow-300" />
                <span className="text-earth-200 text-sm">+233 XX XXX XXXX</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-yellow-300" />
                <span className="text-earth-200 text-sm">Accra, Ghana</span>
              </div>
            </div>
          </div>

          {/* Official Recognition */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Official</h4>
            <div className="space-y-2">
              <p className="text-earth-200 text-sm">
                Ghana's Most Beautiful 2025
              </p>
              <p className="text-yellow-300 font-semibold">First Runner-Up</p>
              <p className="text-earth-200 text-xs mt-4">
                © {new Date().getFullYear()} Asakia Hawawu Hanan. All rights reserved.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-earth-600 mt-8 pt-8 text-center">
          <p className="text-earth-300 text-sm">
            Built with pride in Ghana 🇬🇭
          </p>
        </div>
      </div>
    </footer>
  )
}