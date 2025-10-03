'use client'
import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { FaWhatsapp } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'

type FormType = 'email' | 'whatsapp'

const formVariants = {
  hidden: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 100 : -100,
  }),
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction < 0 ? 100 : -100,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  }),
}

export function ContactForm() {
  const [formType, setFormType] = useState<FormType>('email')
  const [direction, setDirection] = useState(0)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSwitch = (newForm: FormType) => {
    if (newForm === formType) return
    setDirection(newForm === 'email' ? -1 : 1)
    setFormType(newForm)
  }

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const whatsappMessage = `Hello, my name is ${name}. ${message}`
    const whatsappUrl = `https://wa.me/918467898698?text=${encodeURIComponent(
      whatsappMessage
    )}`
    window.open(whatsappUrl, '_blank')
    setName('')
    setMessage('')
  }

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const mailtoUrl = `mailto:studiosirmusiz@gmail.com?subject=Message from ${name}&body=${encodeURIComponent(message)}`
    window.location.href = mailtoUrl
    setName('')
    setEmail('')
    setMessage('')
  }

  return (
    <div className="w-full">
      <div className="flex justify-center mb-8 gap-4">
        <Button
          onClick={() => handleSwitch('email')}
          variant={formType === 'email' ? 'default' : 'outline'}
          className={`rounded-full transition-all duration-300 ${formType === 'email' ? 'bg-blue-500 text-white' : 'text-gray-300 border-gray-600 hover:bg-gray-700'}`}
        >
          <MdEmail className="mr-2" /> Email
        </Button>
        <Button
          onClick={() => handleSwitch('whatsapp')}
          variant={formType === 'whatsapp' ? 'default' : 'outline'}
          className={`rounded-full transition-all duration-300 ${formType === 'whatsapp' ? 'bg-green-500 text-white' : 'text-gray-300 border-gray-600 hover:bg-gray-700'}`}
        >
          <FaWhatsapp className="mr-2" /> WhatsApp
        </Button>
      </div>

      <div className="relative h-[320px]">
        <AnimatePresence initial={false} custom={direction}>
          {formType === 'email' && (
            <motion.form
              key="email"
              custom={direction}
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onSubmit={handleEmailSubmit}
              className="absolute w-full flex flex-col gap-4"
            >
              <h3 className="text-2xl font-bold text-white mb-2 text-center">Contact via Email</h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="name-email" className="text-gray-300">Your Name</Label>
                  <Input id="name-email" type="text" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} className="bg-gray-800/80 border-gray-700 text-white" />
                </div>
                <div>
                  <Label htmlFor="email" className="text-gray-300">Your Email</Label>
                  <Input id="email" type="email" placeholder="john.doe@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-800/80 border-gray-700 text-white" />
                </div>
                <div>
                  <Label htmlFor="message-email" className="text-gray-300">Message</Label>
                  <Textarea id="message-email" placeholder="Your message..." value={message} onChange={(e) => setMessage(e.target.value)} className="bg-gray-800/80 border-gray-700 text-white" />
                </div>
              </div>
              <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold">
                Send Email
              </Button>
            </motion.form>
          )}

          {formType === 'whatsapp' && (
            <motion.form
              key="whatsapp"
              custom={direction}
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onSubmit={handleWhatsAppSubmit}
              className="absolute w-full flex flex-col gap-4"
            >
              <h3 className="text-2xl font-bold text-white mb-2 text-center">Send a WhatsApp Message</h3>
               <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="name-whatsapp" className="text-gray-300">Your Name</Label>
                  <Input id="name-whatsapp" type="text" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} className="bg-gray-800/80 border-gray-700 text-white" />
                </div>
                <div>
                  <Label htmlFor="message-whatsapp" className="text-gray-300">Message</Label>
                  <Textarea id="message-whatsapp" placeholder="Your message..." value={message} onChange={(e) => setMessage(e.target.value)} className="bg-gray-800/80 border-gray-700 text-white" />
                </div>
              </div>
              <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold">
                Send on WhatsApp
              </Button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}