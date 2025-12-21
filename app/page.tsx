"use client"

import { motion } from 'framer-motion'
import { ArrowRight, Crown, Sparkles, Award } from 'lucide-react'
import HeroCanvas from './components/threejs/HeroCanvas'
import Link from 'next/link'
import GalleryGrid from './components/sections/GalleryGrid'
import PressHighlights from './components/sections/PressHighlights'

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center space-x-2 bg-yellow/10 px-4 py-2 rounded-full">
                <Crown className="w-5 h-5 text-yellow-500" />
                <span className="text-yellow-600 font-medium">
                  Ghana's Most Beautiful 2025
                </span>
              </div>

              <h1 className="font-heading text-5xl md:text-7xl font-bold text-earth-500">
                Asakia{' '}
                <span className="text-yellow-500">Hawawu</span>{' '}
                <span className="block">Hanan</span>
              </h1>

              <h2 className="font-subheading text-2xl md:text-3xl text-earth-400">
                First Runner-Up • Cultural Ambassador • Women Empowerment Advocate
              </h2>

              <p className="text-lg text-earth-300 max-w-2xl">
                A beacon of Ghanaian culture and beauty, representing the rich heritage 
                and progressive spirit of modern Ghanaian women on the national stage.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center px-8 py-4 bg-yellow-500 text-white rounded-full font-medium hover:bg-yellow-600 transition-colors group"
                >
                  Explore Journey
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/partners"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-yellow-500 text-yellow-500 rounded-full font-medium hover:bg-yellow-50 transition-colors"
                >
                  Partner With Asakia
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                {[
                  { value: '1st', label: 'Runner-Up' },
                  { value: '30+', label: 'Media Features' },
                  { value: '5+', label: 'Brand Partners' },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-3xl font-bold text-yellow-500">{stat.value}</div>
                    <div className="text-sm text-earth-300">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Column - 3D Canvas */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative"
            >
              <HeroCanvas />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute -top-4 -right-4"
              >
                <Sparkles className="w-8 h-8 text-yellow-300" />
              </motion.div>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -bottom-4 -left-4"
              >
                <Award className="w-8 h-8 text-forest" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Press Highlights */}
      <PressHighlights />

      {/* Gallery Preview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-earth-500">
                Gallery
              </h2>
              <p className="text-earth-300 mt-2">
                Moments from the GMB journey and cultural engagements
              </p>
            </div>
            <Link
              href="/gallery"
              className="text-yellow-500 hover:text-yellow-600 font-medium flex items-center"
            >
              View All
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
          <GalleryGrid limit={4} />
        </div>
      </section>
    </>
  )
}