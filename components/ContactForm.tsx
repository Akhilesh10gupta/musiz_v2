'use client'
import React, { useState, useEffect } from 'react'
import { AnimatePresence, motion, Variants } from 'framer-motion'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { FaWhatsapp } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'

type FormType = 'email' | 'whatsapp'

const formVariants: Variants = {
  hidden: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 100 : -100,
  }),
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: [0.42, 0, 0.58, 1],
    },
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction < 0 ? 100 : -100,
    transition: {
      duration: 0.3,
      ease: [0.42, 0, 0.58, 1],
    },
  }),
}

export function ContactForm() {
  const [formType, setFormType] = useState<FormType>('email')
  const [direction, setDirection] = useState(0)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({})
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  useEffect(() => {
    setName('')
    setEmail('')
    setMessage('')
    setErrors({})
    setSubmissionStatus('idle')
  }, [formType])

  const handleSwitch = (newForm: FormType) => {
    if (newForm === formType) return
    setDirection(newForm === 'email' ? -1 : 1)
    setFormType(newForm)
  }

  const validate = () => {
    const newErrors: { name?: string; email?: string; message?: string } = {}
    if (!name.trim()) {
        newErrors.name = "Name is required."
    }
    if (!message.trim()) {
        newErrors.message = "Message is required."
    }
    if (formType === 'email') {
        if (!email.trim()) {
            newErrors.email = "Email is required."
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Email is invalid."
        }
    }
    return newErrors
  }

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors)
        return
    }

    setSubmissionStatus('sending')
    const whatsappMessage = `Hello, my name is ${name}. ${message}`
    const whatsappUrl = `https://wa.me/918467898698?text=${encodeURIComponent(
      whatsappMessage
    )}`

    const newWindow = window.open(whatsappUrl, '_blank')

    if (newWindow) {
        setSubmissionStatus('success')
        setName('')
        setMessage('')
        setErrors({})
    } else {
        setSubmissionStatus('error')
    }
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmissionStatus('sending')
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors)
        setSubmissionStatus('idle')
        return
    }

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      })

      if (response.ok) {
        setSubmissionStatus('success')
        setName('')
        setEmail('')
        setMessage('')
        setErrors({})
      } else {
        const errorData = await response.json()
        setSubmissionStatus('error')
        console.error('Email send failed:', errorData.error)
      }
    } catch (error) {
      setSubmissionStatus('error')
      console.error('Error sending email:', error)
    }
  }

  const isSubmitting = submissionStatus === 'sending'

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

      <div className="relative h-[450px]">
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
              <div className="grid grid-cols-1 gap-2">
                <div>
                  <Label htmlFor="name-email" className="text-gray-300">Your Name</Label>
                  <Input id="name-email" type="text" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} className="bg-gray-800/80 border-gray-700 text-white" disabled={isSubmitting} />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <Label htmlFor="email" className="text-gray-300">Your Email</Label>
                  <Input id="email" type="email" placeholder="john.doe@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-800/80 border-gray-700 text-white" disabled={isSubmitting} />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                  <Label htmlFor="message-email" className="text-gray-300">Message</Label>
                  <Textarea id="message-email" placeholder="Your message..." value={message} onChange={(e) => setMessage(e.target.value)} className="bg-gray-800/80 border-gray-700 text-white" disabled={isSubmitting} />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                </div>
              </div>
              <motion.div className="flex justify-center mt-2" whileTap={{ scale: 0.95 }}>
                <Button type="submit" className="px-8 bg-blue-500 hover:bg-blue-600 text-white font-semibold" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Email'}
                </Button>
              </motion.div>
              {submissionStatus === 'success' && (
                <p className="text-green-500 text-center mt-2">Email sent successfully!</p>
              )}
              {submissionStatus === 'error' && (
                <p className="text-red-500 text-center mt-2">Failed to send email. Please try again.</p>
              )}
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
               <div className="grid grid-cols-1 gap-2">
                <div>
                  <Label htmlFor="name-whatsapp" className="text-gray-300">Your Name</Label>
                  <Input id="name-whatsapp" type="text" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} className="bg-gray-800/80 border-gray-700 text-white" disabled={submissionStatus === 'sending'} />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <Label htmlFor="message-whatsapp" className="text-gray-300">Message</Label>
                  <Textarea id="message-whatsapp" placeholder="Your message..." value={message} onChange={(e) => setMessage(e.target.value)} className="bg-gray-800/80 border-gray-700 text-white" disabled={submissionStatus === 'sending'} />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                </div>
              </div>
              <motion.div className="flex justify-center mt-2" whileTap={{ scale: 0.95 }}>
                <Button type="submit" className="px-8 bg-green-500 hover:bg-green-600 text-white font-semibold" disabled={submissionStatus === 'sending'}>
                  {submissionStatus === 'sending' ? 'Sending...' : 'Send on WhatsApp'}
                </Button>
              </motion.div>
              {submissionStatus === 'success' && (
                <p className="text-green-500 text-center mt-2">WhatsApp opened successfully!</p>
              )}
              {submissionStatus === 'error' && (
                <p className="text-red-500 text-center mt-2">Failed to open WhatsApp. Please try again or contact us directly at +91 84678 98698.</p>
              )}
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
