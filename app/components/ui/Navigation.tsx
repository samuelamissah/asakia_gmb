"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Crown, Instagram, Twitter, Youtube } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Events', href: '/events' }, // Added
  { name: 'Partners', href: '/partners' },
  { name: 'Press', href: '/press' },
  { name: 'Contact', href: '/contact' },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-ivory/90 backdrop-blur-md shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <Crown className="w-8 h-8 text-yellow-500" />
              <div>
                <h1 className="font-heading text-xl font-bold text-earth-500">
                  Asakia Hanan
                </h1>
                <p className="text-xs text-earth-300">
                  GMB 2025 First Runner-Up
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative px-1 py-2 text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? 'text-yellow-500'
                      : 'text-earth-400 hover:text-yellow-500'
                  }`}
                >
                  {item.name}
                  {pathname === item.href && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute left-0 right-0 h-0.5 bg-yellow-500 -bottom-1"
                    />
                  )}
                </Link>
              ))}
              
              {/* Social Links */}
              <div className="flex items-center space-x-4 ml-8">
                <a href="https://instagram.com/asakiahanan" className="text-earth-400 hover:text-yellow-500">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://twitter.com/asakiahanan" className="text-earth-400 hover:text-yellow-500">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="https://youtube.com/@asakiahanan" className="text-earth-400 hover:text-yellow-500">
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-md text-earth-400 hover:text-yellow-500"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween' }}
            className="fixed inset-y-0 right-0 z-40 w-64 bg-ivory shadow-2xl md:hidden"
          >
            <div className="flex flex-col h-full p-6">
              <div className="flex justify-between items-center mb-8">
                <h2 className="font-heading text-xl font-bold text-earth-500">
                  Menu
                </h2>
                <button
                  title='Close Menu'
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-md text-earth-400 hover:text-yellow-500"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-lg font-medium py-2 ${
                      pathname === item.href
                        ? 'text-yellow-500 border-l-4 border-yellow-500 pl-4'
                        : 'text-earth-400 hover:text-yellow-500 pl-6'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              <div className="mt-auto pt-8 border-t border-earth-100">
                <p className="text-sm text-earth-300 mb-4">Follow Asakia</p>
                <div className="flex space-x-4">
                  {['Instagram', 'Twitter', 'YouTube'].map((social) => (
                    <a
                      key={social}
                      href="#"
                      className="text-earth-400 hover:text-yellow-500 transition-colors"
                    >
                      {social}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}