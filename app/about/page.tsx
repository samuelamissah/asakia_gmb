"use client"

import { motion } from 'framer-motion'
import { Heart, Users, Globe, Target, Crown, Star, Award, Sparkles } from 'lucide-react'
import Image from 'next/image'

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: 'Cultural Preservation',
      description: 'Promoting Ghanaian heritage through modern platforms',
      color: 'from-red-500 to-pink-500',
    },
    {
      icon: Users,
      title: 'Women Empowerment',
      description: 'Advocating for equal opportunities and education',
      color: 'from-purple-500 to-indigo-500',
    },
    {
      icon: Globe,
      title: 'National Development',
      description: 'Contributing to Ghana\'s growth and global image',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Target,
      title: 'Youth Inspiration',
      description: 'Inspiring the next generation of Ghanaian leaders',
      color: 'from-green-500 to-emerald-500',
    },
  ]

  const journey = [
    {
      year: '2025',
      title: 'GMB First Runner-Up',
      description: 'Achieved remarkable success in Ghana\'s premier pageant',
      achievement: '🏆 National Recognition',
    },
    {
      year: '2024',
      title: 'Cultural Ambassador',
      description: 'Began official cultural diplomacy engagements',
      achievement: '🌍 International Reach',
    },
    {
      year: '2023',
      title: 'Community Initiatives',
      description: 'Launched women empowerment programs in Northern Ghana',
      achievement: '👩‍👧‍👦 500+ Women Impacted',
    },
    {
      year: '2022',
      title: 'Public Recognition',
      description: 'Featured in national media for advocacy work',
      achievement: '📺 20+ Media Features',
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16 relative"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute left-1/4 top-0 opacity-20"
        >
          <Crown className="w-16 h-16 text-yellow-500" />
        </motion.div>
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute right-1/4 bottom-0 opacity-20"
        >
          <Star className="w-16 h-16 text-amber-500" />
        </motion.div>
        <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-earth-500 mb-6">
          About <span className="text-yellow-500">Asakia</span>
        </h1>
        <div className="inline-flex items-center space-x-2 bg-linear-to-r from-yellow-500/10 to-amber-500/10 px-6 py-3 rounded-full border border-yellow-500/20 mb-6">
          <Crown className="w-5 h-5 text-yellow-500" />
          <span className="text-yellow-600 font-medium">
            Ghana's Most Beautiful 2025 • First Runner-Up
          </span>
        </div>
        <p className="text-xl text-earth-300 max-w-3xl mx-auto mt-6">
          A cultural ambassador, women empowerment advocate, and national treasure 
          representing the beauty and strength of Ghanaian heritage.
        </p>
      </motion.div>

      {/* Profile Section with Image on Right */}
      <div className="grid lg:grid-cols-2 gap-12 mb-20">
        {/* Left Column - Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8 order-2 lg:order-1"
        >
          <div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-earth-500 mb-4">
              The <span className="text-yellow-500">Queen's</span> Journey
            </h2>
            <div className="h-1 w-24 bg-linear-to-r from-yellow-500 to-amber-500 mb-6" />
          </div>
          
          <p className="text-lg text-earth-300 leading-relaxed">
            Asakia Hawawu Hanan emerged as a symbol of grace, intelligence, and 
            cultural pride during her journey through Ghana's Most Beautiful 2025. 
            Her platform combines traditional values with progressive vision.
          </p>
          
          <p className="text-earth-300 leading-relaxed">
            Born and raised in Ghana, Asakia has always been passionate about 
            preserving her cultural heritage while advocating for women's rights 
            and youth development. Her GMB journey showcased not just beauty, 
            but intellect, cultural knowledge, and a deep commitment to national service.
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4 py-6">
            {[
              { label: 'Pageant Rank', value: '1st Runner-Up' },
              { label: 'Years Active', value: '3+ Years' },
              { label: 'Programs Launched', value: '5+ Initiatives' },
              { label: 'Media Features', value: '30+ Features' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-linear-to-br from-earth-50 to-earth-100 p-4 rounded-xl"
              >
                <div className="text-2xl font-bold text-yellow-500">{stat.value}</div>
                <div className="text-sm text-earth-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
          
          {/* Mission Statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="pt-6"
          >
            <div className="flex items-center mb-4">
              <Sparkles className="w-5 h-5 text-yellow-500 mr-2" />
              <h3 className="font-heading text-xl font-semibold text-earth-500">
                Mission Statement
              </h3>
            </div>
            <blockquote className="relative pl-8 py-4 text-earth-400 italic text-lg">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-linear-to-b from-yellow-500 to-amber-500" />
              "To bridge our rich cultural heritage with contemporary progress, 
              empowering Ghanaian women and youth to become architects of our 
              nation's bright future."
            </blockquote>
          </motion.div>
        </motion.div>

        {/* Right Column - Image */}
        <motion.div
          initial={{ opacity: 0, x: 50, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative order-1 lg:order-2"
        >
          <div className="relative group">
            {/* Main Image Container */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <div className="aspect-[3/4] relative">
                <Image
                  src="/image3.jpeg" // Update with your image path
                  alt="Asakia Hawawu Hanan - Ghana's Most Beautiful 2025"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                  priority
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-earth-900/40 via-earth-900/10 to-transparent" />
              </div>
              
              {/* Decorative frame */}
              <div className="absolute inset-0 border-4 border-yellow-500/20 rounded-3xl pointer-events-none group-hover:border-yellow-500/30 transition-colors" />
            </div>

            {/* Floating Badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-500 to-amber-500 text-white p-4 rounded-xl shadow-xl"
            >
              <div className="flex items-center">
                <Award className="w-6 h-6 mr-2" />
                <div>
                  <div className="text-lg font-bold">GMB 2025</div>
                  <div className="text-xs">First Runner-Up</div>
                </div>
              </div>
            </motion.div>

            {/* Bottom Decoration */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-forest/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -right-6 w-24 h-24 bg-yellow-500/10 rounded-full blur-2xl" />

            {/* Signature */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="absolute bottom-8 left-8"
            >
              <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
                <div className="text-sm text-earth-500">With grace & purpose,</div>
                <div className="font-signature text-2xl text-yellow-600">Asakia</div>
              </div>
            </motion.div>
          </div>

          {/* Stats Bar */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              { icon: '👑', label: 'Royalty', value: 'Queen' },
              { icon: '🌟', label: 'Influence', value: 'National' },
              { icon: '💝', label: 'Passion', value: 'Service' },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="bg-gradient-to-b from-earth-800 to-earth-900 p-4 rounded-xl text-center border border-earth-700"
              >
                <div className="text-2xl mb-1">{item.icon}</div>
                <div className="text-white font-medium">{item.value}</div>
                <div className="text-earth-300 text-xs">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Values */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-20"
      >
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-earth-500 mb-4">
            Core <span className="text-yellow-500">Values</span>
          </h2>
          <p className="text-earth-300 max-w-2xl mx-auto">
            The principles that guide Asakia's journey and advocacy work
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, i) => {
            const Icon = value.icon
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative"
              >
                {/* Background glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${value.color} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-xl`} />
                
                {/* Card */}
                <div className="relative bg-gradient-to-b from-white to-earth-50 p-6 rounded-2xl shadow-lg border border-earth-100 group-hover:shadow-xl transition-all duration-300">
                  <div className={`w-14 h-14 bg-gradient-to-br ${value.color} rounded-xl flex items-center justify-center mb-5`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-earth-500 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-earth-300">{value.description}</p>
                  
                  {/* Hover indicator */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-yellow-500 to-amber-500 group-hover:w-full transition-all duration-300 rounded-full" />
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mb-20"
      >
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-earth-500 mb-4">
            Royal <span className="text-yellow-500">Milestones</span>
          </h2>
          <p className="text-earth-300 max-w-2xl mx-auto">
            The remarkable journey of Asakia's rise to national prominence
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-1 h-full bg-gradient-to-b from-yellow-500 via-amber-500 to-transparent" />
          
          {journey.map((item, i) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
              className={`relative flex items-start mb-12 ${
                i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Year Marker */}
              <div className={`absolute left-0 md:relative z-10 ${
                i % 2 === 0 ? 'md:w-1/2 md:pr-12 md:text-right' : 'md:w-1/2 md:pl-12'
              }`}>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full flex items-center justify-center shadow-lg">
                    <div className="w-3 h-3 bg-white rounded-full" />
                  </div>
                  <div className={`ml-4 md:ml-0 ${
                    i % 2 === 0 ? 'md:mr-4' : 'md:ml-4'
                  }`}>
                    <div className="text-yellow-500 font-bold text-2xl">{item.year}</div>
                  </div>
                </div>
              </div>
              
              {/* Content Card */}
              <div className={`ml-12 md:ml-0 md:w-1/2 ${
                i % 2 === 0 ? 'md:pl-12' : 'md:pr-12'
              }`}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-br from-white to-earth-50 p-6 rounded-2xl shadow-lg border border-earth-100"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-heading text-xl font-semibold text-earth-500">
                      {item.title}
                    </h3>
                    <div className="text-yellow-500">
                      <Star className="w-5 h-5" />
                    </div>
                  </div>
                  <p className="text-earth-300 mb-4">{item.description}</p>
                  <div className="inline-flex items-center px-3 py-1 bg-yellow-50 text-yellow-600 rounded-full text-sm">
                    {item.achievement}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="text-center bg-linear-to-r from-yellow-500/10 via-amber-500/10 to-yellow-500/10 rounded-3xl p-12"
      >
        <h3 className="font-heading text-3xl font-bold text-earth-500 mb-4">
          Join the Journey
        </h3>
        <p className="text-earth-300 max-w-2xl mx-auto mb-8">
          Be part of Asakia's mission to empower Ghanaian women and preserve our 
          cultural heritage for generations to come.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-3 bg-linear-to-r from-yellow-500 to-amber-500 text-white rounded-full font-medium hover:shadow-xl transition-all">
            Support the Cause
          </button>
          <button className="px-8 py-3 border-2 border-yellow-500 text-yellow-500 rounded-full font-medium hover:bg-yellow-500/10 transition-all">
            Contact for Speaking
          </button>
        </div>
      </motion.div>
    </div>
  )
}