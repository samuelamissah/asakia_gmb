"use client"

import { motion } from 'framer-motion'
import { ArrowRight, Crown, Sparkles, Award, Star, Gem } from 'lucide-react'
import HeroCanvas from './components/threejs/HeroCanvas'
import Link from 'next/link'
import GalleryGrid from './components/sections/GalleryGrid'
import PressHighlights from './components/sections/PressHighlights'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-forest/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-500/10 to-amber-500/10 px-4 py-2 rounded-full border border-yellow-500/20">
                <Crown className="w-5 h-5 text-yellow-500" />
                <span className="text-yellow-600 font-medium">
                  Ghana's Most Beautiful 2025
                </span>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Star className="w-4 h-4 text-amber-500 ml-1" />
                </motion.div>
              </div>

              <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-earth-500 leading-tight">
                Asakia{' '}
                <span className="relative">
                  <span className="text-yellow-500">Hawawu</span>
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="absolute -top-4 -right-4"
                  >
                    <Gem className="w-8 h-8 text-yellow-400" />
                  </motion.span>
                </span>{' '}
                <span className="block mt-2">Hanan</span>
              </h1>

              <h2 className="font-subheading text-2xl md:text-3xl text-earth-400 italic">
                First Runner-Up • Cultural Ambassador • Women Empowerment Advocate
              </h2>

              <p className="text-lg text-earth-300 max-w-2xl bg-earth-900/30 p-6 rounded-2xl border border-earth-800/50">
                A beacon of Ghanaian culture and beauty, representing the rich heritage 
                and progressive spirit of modern Ghanaian women on the national stage.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-yellow-500 to-amber-500 text-white rounded-full font-medium hover:shadow-2xl hover:shadow-yellow-500/30 transition-all duration-300 group transform hover:-translate-y-1"
                >
                  Explore Journey
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </Link>
                <Link
                  href="/partners"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-yellow-500 text-yellow-500 rounded-full font-medium hover:bg-yellow-500/10 transition-all duration-300 group transform hover:-translate-y-1"
                >
                  Partner With Asakia
                  <Sparkles className="ml-2 w-4 h-4 group-hover:rotate-12 transition-transform" />
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                {[
                  { value: '1st', label: 'Runner-Up', icon: '👑' },
                  { value: '30+', label: 'Media Features', icon: '📰' },
                  { value: '5+', label: 'Brand Partners', icon: '🤝' },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="text-center p-4 bg-gradient-to-b from-earth-800/30 to-transparent rounded-2xl border border-earth-700/50 hover:border-yellow-500/30 transition-colors"
                  >
                    <div className="text-4xl mb-2">{stat.icon}</div>
                    <div className="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-amber-500 bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-sm text-earth-300 mt-1">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Column - 3D Canvas with Queen Image Overlay */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative h-[600px] lg:h-[700px] perspective-1000"
            >
              {/* 3D Background Canvas */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden border-2 border-yellow-500/20 shadow-2xl shadow-yellow-500/10">
                <HeroCanvas />
              </div>

              {/* Queen's Image Container */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[90%]"
              >
                <div className="relative group">
                  {/* Image with gradient overlay */}
                  <div className="relative rounded-t-2xl overflow-hidden">
                    <Image
                      src="/image1.jpeg" // Update with your image path
                      alt="Asakia Hawawu Hanan - Ghana's Most Beautiful 2025"
                      width={500}
                      height={700}
                      className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                      priority
                    />
                    {/* Royal gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-earth-900 via-earth-900/70 to-transparent" />
                    
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  </div>

                  {/* Royal frame */}
                  <div className="absolute -inset-4 border-2 border-yellow-400/30 rounded-3xl pointer-events-none group-hover:border-yellow-400/50 transition-colors" />
                  <div className="absolute -inset-6 border border-yellow-500/10 rounded-3xl pointer-events-none" />
                </div>
              </motion.div>

              {/* Floating decorative elements */}
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-8 left-8"
              >
                <Crown className="w-10 h-10 text-yellow-400 drop-shadow-lg" />
              </motion.div>

              <motion.div
                animate={{ 
                  y: [0, 20, 0],
                  rotate: [0, -5, 5, 0]
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
                className="absolute bottom-32 right-8"
              >
                <Sparkles className="w-8 h-8 text-amber-400 drop-shadow-lg" />
              </motion.div>

              {/* Glowing orbs */}
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity 
                }}
                className="absolute top-4 right-4 w-4 h-4 bg-yellow-400 rounded-full blur-sm"
              />
              
              <motion.div
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  delay: 1
                }}
                className="absolute bottom-16 left-6 w-6 h-6 bg-forest/40 rounded-full blur-sm"
              />
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ArrowRight className="w-6 h-6 text-yellow-500 rotate-90" />
        </motion.div>
      </section>

      {/* Press Highlights */}
      <PressHighlights />

      {/* Gallery Preview */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-earth-950/10 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex justify-between items-center mb-12">
            <div>
              <div className="inline-flex items-center space-x-2 mb-4">
                <Sparkles className="w-5 h-5 text-yellow-500" />
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-earth-500">
                  Royal Gallery
                </h2>
              </div>
              <p className="text-earth-300">
                Captivating moments from the GMB journey and cultural engagements
              </p>
            </div>
            <Link
              href="/gallery"
              className="text-yellow-500 hover:text-yellow-600 font-medium flex items-center group"
            >
              View All
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
          <GalleryGrid limit={4} />
        </div>
      </section>
    </>
  )
}