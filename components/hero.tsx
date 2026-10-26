'use client'

import { useRef, type MouseEvent } from 'react'
import { ArrowDown, ArrowRight, BrainCircuit, Network, Server } from 'lucide-react'

function useMagnetic(strength = 0.35) {
  const ref = useRef<HTMLAnchorElement>(null)

  const handleMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`
  }

  const handleLeave = () => {
    const el = ref.current
    if (el) el.style.transform = 'translate(0px, 0px)'
  }

  return { ref, handleMove, handleLeave }
}

function MagneticLink({ href, className, children }: { href: string; className: string; children: React.ReactNode }) {
  const { ref, handleMove, handleLeave } = useMagnetic()
  return (
    <a
      ref={ref}
      href={href}
      className={`${className} transition-transform duration-300 ease-out will-change-transform`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </a>
  )
}

const pillars = [
  { icon: Network, label: 'Réseaux & Sécurité' },
  { icon: Server, label: 'Full-Stack & Architecture' },
  { icon: BrainCircuit, label: 'Produit & Entrepreneuriat' },
]

const stats = [
  { value: 'Master', label: 'Génie Logiciel' },
  { value: 'Certifié', label: 'Réseaux (Cisco)' },
  { value: '5+', label: 'Projets & Startups' },
]

export function Hero() {
  return (
    <section
      id="home"
      className="relative z-10 min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-20"
    >
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <div className="mb-8 inline-flex justify-center animate-slide-in-up">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-neon-cyan/30 bg-neon-cyan/5 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse-dot" />
            <span className="text-sm font-medium text-slate-300">
              Open to opportunities — Full-Stack · Startup · Product
            </span>
          </div>
        </div>

        <h1 className="mb-6 animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
          <span className="heading block text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] gradient-text-soft">
            Ingénieur
          </span>
          <span className="heading block text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] gradient-text">
            Génie Logiciel
          </span>
          <span className="mt-4 heading block text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-400">
            Développeur Full-Stack & Fondateur Startup
          </span>
        </h1>

        <div className="mb-10 flex flex-wrap items-center justify-center gap-3 animate-blur-in" style={{ animationDelay: '0.3s' }}>
          {pillars.map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-slate-200 border border-neon-violet/25 bg-neon-violet/5 hover:border-neon-cyan/50 hover:bg-neon-cyan/10 transition-all duration-300"
            >
              <Icon size={16} className="text-neon-cyan" />
              {label}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-16 animate-fade-in-scale" style={{ animationDelay: '0.5s' }}>
          <MagneticLink href="#projects" className="btn-glow">
            Voir mes projets
            <ArrowRight size={18} />
          </MagneticLink>
          <MagneticLink href="#contact" className="btn-outline-neon">
            Me contacter
          </MagneticLink>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="glass-card px-5 py-4 text-center animate-fade-in-scale"
              style={{ animationDelay: `${600 + i * 120}ms` }}
            >
              <div className="heading text-2xl md:text-3xl font-bold gradient-text">{stat.value}</div>
              <div className="text-xs md:text-sm text-slate-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400 hover:text-white transition-colors group"
        aria-label="Défiler vers la section À propos"
      >
        <span className="text-xs uppercase tracking-widest">Explorer</span>
        <ArrowDown size={18} className="animate-bounce group-hover:text-neon-cyan transition-colors" />
      </a>
    </section>
  )
}
