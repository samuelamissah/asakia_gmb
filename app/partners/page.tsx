"use client"

import { motion } from 'framer-motion'
import { BadgeCheck, TrendingUp, Users, Target } from 'lucide-react'
import PartnerCard from '../components/sections/PartnerCard'

const partnershipTypes = [
  {
    title: 'Brand Ambassador',
    description: 'Representing brands aligned with cultural values and women empowerment',
    icon: BadgeCheck,
    color: 'bg-yellow-500',
    link: '/partnerships/brand-ambassador',
  },
  {
    title: 'Event Hosting',
    description: 'Hosting cultural events, galas, and corporate functions',
    icon: Users,
    color: 'bg-forest',
    link: '/partnerships/event-hosting',
  },
  {
    title: 'Campaign Collaboration',
    description: 'Co-creating impactful social campaigns',
    icon: TrendingUp,
    color: 'bg-clay',
    link: '/partnerships/campaign-collaboration',
  },
  {
    title: 'Strategic Partnership',
    description: 'Long-term collaborations for mutual growth',
    icon: Target,
    color: 'bg-royal',
    link: '/partnerships/strategic-partnership',
  },
]

const partners = [
  {
    name: 'Ghana Tourism Authority',
    category: 'Cultural Partner',
    description: 'Promoting Ghanaian tourism and cultural heritage',
    logo: '/partners/gta.png',
    link: 'https://www.ghana.travel/',
  },
  {
    name: 'Shea Butter Collective',
    category: 'Women Empowerment',
    description: 'Supporting women-led shea butter cooperatives',
    logo: '/partners/sheabutter.png',
    link: 'https://www.sheabuttercollective.com/',
  },
  {
    name: 'TV3 Network',
    category: 'Media Partner',
    description: 'National media coverage and collaboration',
    logo: '/partners/tv3.png',
    link: 'https://www.tv3network.com/',
  },
  {
    name: 'Ghana Fashion Week',
    category: 'Fashion Partner',
    description: 'Showcasing Ghanaian fashion design',
    logo: '/partners/fashionweek.png',
    link: 'https://www.ghfashionweek.com/',
  },
]

export default function PartnersPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-earth-500 mb-6">
          Brands & Partnerships
        </h1>
        <p className="text-xl text-earth-300 max-w-3xl mx-auto">
          Asakia partners with brands and organizations that share her commitment to 
          cultural preservation, women empowerment, and national development.
        </p>
      </motion.div>

      {/* Partnership Types */}
      <div className="mb-20">
        <h2 className="font-heading text-3xl font-bold text-center text-earth-500 mb-12">
          Partnership Opportunities
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {partnershipTypes.map((type, i) => {
            const Icon = type.icon
            return (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group cursor-pointer"
              >
                <a
                  href={type.link}
                  className="block bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 h-full"
                >
                  <div className={`${type.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-earth-500 mb-2 group-hover:text-yellow-500 transition-colors">
                    {type.title}
                  </h3>
                  <p className="text-earth-300 text-sm">{type.description}</p>
                  <div className="mt-4 pt-4 border-t border-earth-100">
                    <span className="text-sm text-yellow-500 font-medium inline-flex items-center">
                      Learn more
                      <svg 
                        className="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </span>
                  </div>
                </a>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Current Partners */}
      <div className="mb-20">
        <h2 className="font-heading text-3xl font-bold text-center text-earth-500 mb-12">
          Current Partners
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {partners.map((partner, i) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <a
                href={partner.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 h-full"
              >
                {/* Logo placeholder - replace with actual image component */}
                <div className="w-full h-32 bg-earth-50 rounded-lg mb-4 flex items-center justify-center">
                  <div className="text-earth-500 font-semibold text-center">
                    {partner.name.split(' ').map(word => word[0]).join('')}
                  </div>
                </div>
                <div className="mb-2">
                  <span className="inline-block px-3 py-1 text-xs font-medium text-earth-600 bg-earth-100 rounded-full">
                    {partner.category}
                  </span>
                </div>
                <h3 className="font-heading text-lg font-semibold text-earth-500 mb-2 group-hover:text-yellow-500 transition-colors">
                  {partner.name}
                </h3>
                <p className="text-earth-300 text-sm mb-4">{partner.description}</p>
                <div className="mt-4 pt-4 border-t border-earth-100">
                  <span className="text-sm text-yellow-500 font-medium inline-flex items-center">
                    Visit website
                    <svg 
                      className="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </span>
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl p-8 md:p-12 text-center text-white"
      >
        <h3 className="font-heading text-3xl font-bold mb-4">
          Partner With Asakia
        </h3>
        <p className="text-yellow-100 mb-8 max-w-2xl mx-auto">
          Join Asakia in creating meaningful impact through cultural promotion, 
          women empowerment, and community development initiatives.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-3 bg-white text-yellow-600 font-medium rounded-full hover:bg-yellow-50 transition-colors">
            Download Partnership Deck
          </button>
          <button className="px-8 py-3 border-2 border-white text-white font-medium rounded-full hover:bg-white/10 transition-colors">
            Schedule a Meeting
          </button>
        </div>
      </motion.div>
    </div>
  )
}