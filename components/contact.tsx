'use client'

import { useEffect, useRef, useState } from 'react'
import { Mail, MapPin, Linkedin, Github, Phone, MessageCircle } from 'lucide-react'
import { Reveal } from './reveal'


export function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<number | null>(null)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [website, setWebsite] = useState('')

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add('animate-blur-in')
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (website) return

    const name = formData.name.trim()
    const email = formData.email.trim()
    const message = formData.message.trim()
    if (!name || !email || !message) return

    const subject = encodeURIComponent(`Portfolio — message de ${name}`)
    const body = encodeURIComponent(`Nom : ${name}\r\nEmail : ${email}\r\n\r\n${message}`)
    window.location.href = `mailto:nadironadiro44@gmail.com?subject=${subject}&body=${body}`

    setSubmitted(true)
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = window.setTimeout(() => setSubmitted(false), 6000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <section id="contact" className="relative z-10 py-24 px-4 overflow-hidden">
      <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-neon-violet/10 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto relative">
        <Reveal className="text-center mb-16">
          <span className="section-label">Contact</span>
          <h2 className="heading mt-4 text-4xl md:text-5xl font-bold gradient-text">
            Travaillons ensemble
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto mt-4">
            Un stage, une alternance, un premier emploi ou simplement une question ? Écrivez-moi —
            je réponds rapidement.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start" ref={ref}>
          <Reveal direction="left">
            <div className="glass-card p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-5" noValidate={false}>
                <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
                  <label htmlFor="company" className="sr-only">Company</label>
                  <input
                    id="company"
                    type="text"
                    name="company"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    autoComplete="company"
                  />
                </div>

                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">Nom</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Votre nom"
                    maxLength={80}
                    autoComplete="name"
                    className="w-full px-4 py-2.5 bg-[#0e1024]/80 border border-neon-cyan/25 rounded-lg focus:border-neon-cyan focus:outline-none focus:ring-2 focus:ring-neon-cyan/20 transition-all text-foreground placeholder:text-slate-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="vous@exemple.com"
                    maxLength={120}
                    autoComplete="email"
                    className="w-full px-4 py-2.5 bg-[#0e1024]/80 border border-neon-cyan/25 rounded-lg focus:border-neon-cyan focus:outline-none focus:ring-2 focus:ring-neon-cyan/20 transition-all text-foreground placeholder:text-slate-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Parlez-moi de votre projet…"
                    rows={5}
                    maxLength={2000}
                    className="w-full px-4 py-2.5 bg-[#0e1024]/80 border border-neon-cyan/25 rounded-lg focus:border-neon-cyan focus:outline-none focus:ring-2 focus:ring-neon-cyan/20 transition-all text-foreground placeholder:text-slate-500 resize-none"
                    required
                  />
                </div>

                <button type="submit" className="btn-glow w-full">
                  Envoyer le message
                </button>

                {submitted && (
                  <div
                    className="p-4 border border-neon-cyan/40 rounded-lg text-neon-cyan text-sm bg-neon-cyan/5"
                    role="status"
                  >
                    Merci pour votre message ! Votre client de messagerie va s&apos;ouvrir pour
                    finaliser l&apos;envoi. S&apos;il ne s&apos;ouvre pas, écrivez directement à{' '}
                    <a href="mailto:nadironadiro44@gmail.com" className="underline">
                      nadironadiro44@gmail.com
                    </a>{' '}
                    — vos informations restent conservées dans le formulaire.
                  </div>
                )}
              </form>
            </div>
          </Reveal>

          <div className="space-y-6">
            <Reveal direction="right" delay={100}>
              <div className="glass-card p-6 md:p-8">
                <h3 className="heading text-lg font-semibold text-white mb-6">Coordonnées</h3>
                <div className="space-y-5">
                  <a href="mailto:nadironadiro44@gmail.com" className="flex gap-4 group">
                    <Mail size={20} className="text-neon-cyan flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                    <div>
                      <p className="text-sm text-slate-400 mb-0.5">Email</p>
                      <p className="text-foreground font-medium group-hover:text-neon-cyan transition-colors break-all">
                        nadironadiro44@gmail.com
                      </p>
                    </div>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/nadir-eldjouzi-a316432aa/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-4 group"
                  >
                    <Linkedin size={20} className="text-neon-cyan flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                    <div>
                      <p className="text-sm text-slate-400 mb-0.5">LinkedIn</p>
                      <p className="text-foreground font-medium group-hover:text-neon-cyan transition-colors break-all">
                        /in/nadir-eldjouzi
                      </p>
                    </div>
                  </a>
                  <a
                    href="https://github.com/nadir-eldjouzi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-4 group"
                  >
                    <Github size={20} className="text-neon-cyan flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                    <div>
                      <p className="text-sm text-slate-400 mb-0.5">GitHub</p>
                      <p className="text-foreground font-medium group-hover:text-neon-cyan transition-colors break-all">
                        /nadir-eldjouzi
                      </p>
                    </div>
                  </a>
<div className="flex gap-4 group">
                      <Phone size={20} className="text-neon-cyan flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                      <div>
                        <p className="text-sm text-slate-400 mb-0.5">Téléphone / WhatsApp</p>
                        <a href="https://wa.me/213676267055" target="_blank" rel="noopener noreferrer" className="text-foreground font-medium group-hover:text-neon-cyan transition-colors break-all">
                          +213 676 267 055
                        </a>
                      </div>
                    </div>
                    <div className="flex gap-4 group">
                      <MessageCircle size={20} className="text-neon-cyan flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                      <div>
                        <p className="text-sm text-slate-400 mb-0.5">WhatsApp Direct</p>
                        <a href="https://wa.me/213676267055" target="_blank" rel="noopener noreferrer" className="text-foreground font-medium group-hover:text-neon-cyan transition-colors break-all">
                          Ouvrir WhatsApp
                        </a>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <MapPin size={20} className="text-neon-cyan flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-slate-400 mb-0.5">Localisation</p>
                        <p className="text-foreground font-medium">Tizi-Ouzou, Algérie · Remote</p>
                      </div>
                    </div>
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </div>
    </section>
  )
}
