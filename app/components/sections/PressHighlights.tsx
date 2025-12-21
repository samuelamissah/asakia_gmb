"use client"

import { motion } from 'framer-motion'
import { Newspaper, Mic, Tv, Award } from 'lucide-react'

const pressItems = [
  {
    outlet: 'TV3 Ghana',
    title: 'GMB 2025 First Runner-Up Shares Journey',
    date: 'Oct 15, 2025',
    icon: Tv,
    color: 'text-blue-500',
  },
  {
    outlet: 'Daily Graphic',
    title: 'Cultural Ambassador Advocates for Heritage Preservation',
    date: 'Nov 1, 2025',
    icon: Newspaper,
    color: 'text-red-500',
  },
  {
    outlet: 'Citi FM',
    title: 'Women Empowerment Panel with Asakia Hanan',
    date: 'Nov 20, 2025',
    icon: Mic,
    color: 'text-orange-500',
  },
  {
    outlet: 'Ghana Awards',
    title: 'Most Influential Young Ghanaian Award',
    date: 'Dec 5, 2025',
    icon: Award,
    color: 'text-yellow-500',
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
              <motion.div
                key={item.outlet}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className={`${item.color} p-2 rounded-lg bg-opacity-10`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="ml-3 font-medium text-earth-500">
                    {item.outlet}
                  </span>
                </div>
                <h3 className="font-heading text-lg font-semibold text-earth-500 mb-2">
                  {item.title}
                </h3>
                <div className="text-sm text-earth-300">{item.date}</div>
                <div className="mt-4 pt-4 border-t border-earth-100">
                  <button className="text-yellow-500 hover:text-yellow-600 text-sm font-medium">
                    Read Feature →
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}