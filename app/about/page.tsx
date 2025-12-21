"use client"

import { motion } from 'framer-motion'
import { Heart, Users, Globe, Target } from 'lucide-react'
import Image from 'next/image'

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: 'Cultural Preservation',
      description: 'Promoting Ghanaian heritage through modern platforms',
    },
    {
      icon: Users,
      title: 'Women Empowerment',
      description: 'Advocating for equal opportunities and education',
    },
    {
      icon: Globe,
      title: 'National Development',
      description: 'Contributing to Ghana\'s growth and global image',
    },
    {
      icon: Target,
      title: 'Youth Inspiration',
      description: 'Inspiring the next generation of Ghanaian leaders',
    },
  ]

  const journey = [
    {
      year: '2025',
      title: 'GMB First Runner-Up',
      description: 'Achieved remarkable success in Ghana\'s premier pageant',
    },
    {
      year: '2024',
      title: 'Cultural Ambassador',
      description: 'Began official cultural diplomacy engagements',
    },
    {
      year: '2023',
      title: 'Community Initiatives',
      description: 'Launched women empowerment programs in Northern Ghana',
    },
    {
      year: '2022',
      title: 'Public Recognition',
      description: 'Featured in national media for advocacy work',
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="font-heading text-4xl md:text-6xl font-bold text-earth-500 mb-6">
          About Asakia
        </h1>
        <p className="text-xl text-earth-300 max-w-3xl mx-auto">
          A cultural ambassador, women empowerment advocate, and national treasure 
          representing the beauty and strength of Ghanaian heritage.
        </p>
      </motion.div>

      {/* Profile Section */}
      <div className="grid lg:grid-cols-2 gap-12 mb-20">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative"
        >
          <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            {/* Placeholder for profile image */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-100 to-earth-100" />
          </div>
          <div className="absolute -bottom-6 -right-6 bg-yellow-500 text-white p-6 rounded-xl shadow-xl">
            <div className="text-3xl font-bold">GMB 2025</div>
            <div className="text-sm">First Runner-Up</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <h2 className="font-heading text-3xl font-bold text-earth-500">
            The Journey
          </h2>
          <p className="text-lg text-earth-300">
            Asakia Hawawu Hanan emerged as a symbol of grace, intelligence, and 
            cultural pride during her journey through Ghana's Most Beautiful 2025. 
            Her platform combines traditional values with progressive vision.
          </p>
          <p className="text-earth-300">
            Born and raised in Ghana, Asakia has always been passionate about 
            preserving her cultural heritage while advocating for women's rights 
            and youth development. Her GMB journey showcased not just beauty, 
            but intellect, cultural knowledge, and a deep commitment to national service.
          </p>
          
          <div className="pt-6">
            <h3 className="font-heading text-xl font-semibold text-earth-500 mb-4">
              Mission Statement
            </h3>
            <blockquote className="border-l-4 border-yellow-500 pl-6 py-2 italic text-earth-400">
              "To bridge our rich cultural heritage with contemporary progress, 
              empowering Ghanaian women and youth to become architects of our 
              nation's bright future."
            </blockquote>
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
        <h2 className="font-heading text-3xl font-bold text-center text-earth-500 mb-12">
          Core Values
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, i) => {
            const Icon = value.icon
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-ivory p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-yellow-500" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-earth-500 mb-2">
                  {value.title}
                </h3>
                <p className="text-earth-300">{value.description}</p>
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
      >
        <h2 className="font-heading text-3xl font-bold text-center text-earth-500 mb-12">
          Milestones
        </h2>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-yellow-500 to-transparent" />
          
          {journey.map((item, i) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
              className={`flex items-center mb-12 ${
                i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              }`}
            >
              <div className="w-1/2 px-8">
                <div className={`bg-white p-6 rounded-xl shadow-lg ${
                  i % 2 === 0 ? 'text-right' : 'text-left'
                }`}>
                  <div className="text-yellow-500 font-bold text-lg mb-1">
                    {item.year}
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-earth-500 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-earth-300">{item.description}</p>
                </div>
              </div>
              
              <div className="relative z-10">
                <div className="w-4 h-4 bg-yellow-500 rounded-full" />
              </div>
              
              <div className="w-1/2 px-8">
                {/* Empty space for alignment */}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}