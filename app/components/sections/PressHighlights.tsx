"use client"

import { motion } from 'framer-motion'
import { Newspaper, Mic, Tv, Award, University } from 'lucide-react'
import Link from 'next/link'

const pressItems = [
  {
    id:'1',
    outlet: '3 News Ghana',
    title: 'GMB Traditional Games Night: Asakia wins third Star Performance Award but first in a consecutive',
    date: 'September 15, 2025',
    icon: Newspaper,
    color: 'text-blue-500',
    link: 'https://3news.com/ghanas-most-beautiful/gmb-traditional-games-night-asakia-wins-third-star-performance-award-but-first-in-a-consecutive',
  },
  {
    id:'2',
    outlet: '3 News Ghana',
    title: 'GMB2025 Finalist: Profile of Asakia, the pearl of Upper East Region',
    date: 'October 14, 2025',
    icon: Newspaper,
    color: 'text-red-500',
    link: 'https://3news.com/ghanas-most-beautiful/gmb2025-finalist-profile-of-asakia-the-pearl-of-upper-east-region',
  },
  {
    id:'3',
    outlet: 'Christian Service University',
    title: 'Christian Service University Congratulates Alumna Asakia Hawawu Hanaan 1st Runner-Up – 2025 Ghana’s Most Beautiful (GMB)',
    date: '',
    icon: University,
    color: 'text-orange-500',
    link: 'https://www.csuc.edu.gh/christian-service-university-congratulates-alumna-asakia-hawawu-hanaan-1st-runner-up-2025-ghanas-most-beautiful-gmb/',
  },
  {
    id:'4', 
    outlet: 'GMB Awards',
    title: 'Best Model Award at GMB Fashion Night 2025',
    date: 'Aug 25, 2025',
    icon: Award,
    color: 'text-yellow-500',
    link: 'https://www.tiktok.com/@tv3gh_official/video/7542488349152480568',
  },
]

export default function PressHighlights() {
  return (
    <section className="py-20 bg-gradient-to-b from-ivory to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-earth-500 mb-4">
            Press & Media
          </h2>
          <p className="text-earth-300 max-w-2xl mx-auto">
            National recognition and media coverage highlighting Asakia's impact
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pressItems.map((item, i) => {
            const Icon = item.icon
            return (
              <Link 
                href={item.link} 
                key={item.id}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group h-full"
                >
                  <div className="flex items-center mb-4">
                    <div className={`${item.color} p-2 rounded-lg bg-opacity-10 group-hover:bg-opacity-20 transition-all duration-300`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="ml-3 font-medium text-earth-500 group-hover:text-earth-600 transition-colors">
                      {item.outlet}
                    </span>
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-earth-500 mb-2 group-hover:text-yellow-500 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <div className="text-sm text-earth-300 mb-4">{item.date}</div>
                  <div className="mt-4 pt-4 border-t border-earth-100 group-hover:border-earth-200 transition-colors">
                    <span className="text-yellow-500 group-hover:text-yellow-600 text-sm font-medium inline-flex items-center transition-colors duration-300">
                      Read Feature 
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
                </motion.div>
              </Link>
            )
          })}
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            href="/press"
            className="inline-flex items-center px-6 py-3 border-2 border-earth-200 text-earth-500 font-medium rounded-lg hover:bg-earth-50 hover:border-earth-300 transition-all duration-300"
          >
            View All Media Coverage
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}