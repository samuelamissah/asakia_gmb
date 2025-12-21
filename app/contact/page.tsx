"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Mail, Phone, MapPin, Clock, CheckCircle } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'general',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'contact@asakiahanan.com',
      description: 'For general inquiries and partnership opportunities',
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+233 XX XXX XXXX',
      description: 'Available Monday to Friday, 9 AM - 5 PM GMT',
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Accra, Ghana',
      description: 'Available for events nationwide',
    },
    {
      icon: Clock,
      title: 'Response Time',
      value: '24-48 hours',
      description: 'For all non-urgent inquiries',
    },
  ]

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'partnership', label: 'Partnership Opportunity' },
    { value: 'speaking', label: 'Speaking Engagement' },
    { value: 'media', label: 'Media Interview' },
    { value: 'event', label: 'Event Hosting' },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Reset form
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        type: 'general',
      })
      setIsSubmitted(false)
    }, 3000)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-earth-500 mb-6">
          Get In Touch
        </h1>
        <p className="text-xl text-earth-300 max-w-3xl mx-auto">
          For partnership opportunities, speaking engagements, media inquiries, 
          or to simply connect with Asakia.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <h2 className="font-heading text-2xl font-bold text-earth-500">
            Contact Information
          </h2>
          
          <div className="space-y-6">
            {contactInfo.map((info, i) => {
              const Icon = info.icon
              return (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start space-x-4"
                >
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-yellow-500" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-earth-500">
                      {info.title}
                    </h3>
                    <p className="text-yellow-600 font-medium mt-1">{info.value}</p>
                    <p className="text-earth-300 text-sm mt-1">{info.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Booking Process */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-r from-yellow-50 to-earth-50 rounded-xl p-6"
          >
            <h3 className="font-heading text-xl font-semibold text-earth-500 mb-4">
              Booking Process
            </h3>
            <ol className="space-y-3">
              {[
                'Submit inquiry form or email',
                'Initial consultation call',
                'Proposal and agreement',
                'Event preparation',
                'Engagement execution',
              ].map((step, i) => (
                <li key={step} className="flex items-center">
                  <div className="w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm mr-3">
                    {i + 1}
                  </div>
                  <span className="text-earth-500">{step}</span>
                </li>
              ))}
            </ol>
          </motion.div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="font-heading text-2xl font-bold text-earth-500 mb-2">
                  Message Sent!
                </h3>
                <p className="text-earth-300">
                  Thank you for your inquiry. We'll get back to you within 24-48 hours.
                </p>
              </motion.div>
            ) : (
              <>
                <h2 className="font-heading text-2xl font-bold text-earth-500 mb-6">
                  Send a Message
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-earth-500 mb-2">
                        Name *
                      </label>
                      <input
                        title='Enter your full name'
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 border border-earth-200 rounded-lg focus:outline-none focus:border-yellow-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-earth-500 mb-2">
                        Email *
                      </label>
                      <input
                        title='Enter a valid email address'
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 border border-earth-200 rounded-lg focus:outline-none focus:border-yellow-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-earth-500 mb-2">
                      Inquiry Type
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {inquiryTypes.map((type) => (
                        <button
                          key={type.value}
                          type="button"
                          onClick={() => setFormData({ ...formData, type: type.value })}
                          className={`px-4 py-2 rounded-full border transition-colors ${
                            formData.type === type.value
                              ? 'border-yellow-500 bg-yellow-50 text-yellow-600'
                              : 'border-earth-200 text-earth-400 hover:border-yellow-500'
                          }`}
                        >
                          {type.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-earth-500 mb-2">
                      Subject
                    </label>
                    <input
                    title='Enter a subject for your inquiry'
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 border border-earth-200 rounded-lg focus:outline-none focus:border-yellow-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-earth-500 mb-2">
                      Message *
                    </label>
                    <textarea
                    title='Enter your message here'
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 border border-earth-200 rounded-lg focus:outline-none focus:border-yellow-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center px-6 py-4 bg-yellow-500 text-white font-medium rounded-lg hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      'Sending...'
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}