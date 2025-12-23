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
  { name: 'Events', href: '/events' },
  { name: 'Partners', href: '/partners' },
  { name: 'Press', href: '/press' },
  { name: 'Contact', href: '/contact' },
]

const socialLinks = [
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/asakiahanan' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/asakiahanan' },
  { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/@asakiahanan' },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-ivory/95 backdrop-blur-md shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 z-50">
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
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-earth-400 hover:text-yellow-500 transition-colors"
                    aria-label={social.name}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Mobile menu button - Toggles between Menu and Close icons */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-md text-earth-400 hover:text-yellow-500 z-50"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Side Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-ivory shadow-2xl md:hidden"
            >
              <div className="flex flex-col h-full p-6 overflow-y-auto">
                {/* Header */}
                <div className="flex items-center mb-8">
                  <div className="flex items-center space-x-2">
                    <Crown className="w-6 h-6 text-yellow-500" />
                    <h2 className="font-heading text-lg font-bold text-earth-500">
                      Menu
                    </h2>
                  </div>
                </div>

                {/* Navigation Items */}
                <nav className="flex-1">
                  <ul className="space-y-2">
                    {navItems.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={`flex items-center text-lg font-medium py-3 px-4 rounded-lg transition-colors ${
                            pathname === item.href
                              ? 'text-yellow-500 bg-yellow-50'
                              : 'text-earth-400 hover:text-yellow-500 hover:bg-earth-50'
                          }`}
                        >
                          {item.name}
                          {pathname === item.href && (
                            <motion.span
                              layoutId="mobile-nav-indicator"
                              className="ml-auto w-2 h-2 bg-yellow-500 rounded-full"
                            />
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>

                {/* Social Links Section */}
                <div className="mt-auto pt-8 border-t border-earth-100">
                  <p className="text-sm text-earth-300 mb-4 font-medium">
                    Follow Asakia
                  </p>
                  <div className="flex space-x-4">
                    {socialLinks.map((social) => {
                      const Icon = social.icon
                      return (
                        <a
                          key={social.name}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-10 h-10 rounded-full bg-earth-50 text-earth-400 hover:text-yellow-500 hover:bg-yellow-50 transition-all duration-300"
                          aria-label={social.name}
                        >
                          <Icon className="w-5 h-5" />
                        </a>
                      )
                    })}
                  </div>
                  
                  {/* Footer Text */}
                  <div className="mt-6 pt-4 border-t border-earth-100">
                    <p className="text-xs text-earth-300">
                      GMB 2025 First Runner-Up
                    </p>
                    <p className="text-xs text-earth-300 mt-1">
                      © {new Date().getFullYear()} Asakia Hanan
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}