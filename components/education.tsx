'use client'

import { useEffect, useRef, useState } from 'react'
import { Award, GraduationCap, Rocket } from 'lucide-react'
import { Reveal } from './reveal'

const milestones = [
  {
    icon: GraduationCap,
    period: '2020 — 2025',
    title: 'Master en Génie Logiciel',
    place: 'Université · Spécialité Ingénierie Logicielle',
    description:
      'Formation approfondie en conception, développement et maintenance de systèmes logiciels complexes. Approches agiles, architecture logicielle, tests, qualité et gestion de projet.',
    tags: ['Génie Logiciel', 'Architecture', 'Agile', 'Tests', 'Qualité'],
  },
  {
    icon: Award,
    period: 'Certification',
    title: 'Certification Réseau',
    place: 'Cisco / Réseaux d\'entreprise',
    description:
      'Certification en réseaux d\'entreprise couvrant le routage, la commutation, la sécurité réseau et l\'administration d\'infrastructures.',
    tags: ['Routing', 'Switching', 'Sécurité', 'Administration'],
  },
]

export function Education() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current
      if (!section) return
      const rect = section.getBoundingClientRect()
      const total = section.offsetHeight - window.innerHeight
      const scrolled = -rect.top
      setProgress(Math.min(1, Math.max(0, total > 0 ? scrolled / total : 1)))
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section id="parcours" className="relative z-10 py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <Reveal className="text-center mb-20">
          <span className="section-label">Parcours & Formation</span>
          <h2 className="heading mt-4 text-4xl md:text-5xl font-bold gradient-text">
            Un parcours construit, étape par étape
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto mt-4">
            De la licence au Master Systèmes Informatiques, en passant par le stage de fin
            d&apos;études et la formation continue.
          </p>
        </Reveal>

        <div ref={sectionRef} className="timeline-track relative">
          <div
            ref={lineRef}
            className="timeline-line"
            style={{ transform: `scaleY(${progress})` }}
          />

          <div className="space-y-12 md:space-y-20">
            {milestones.map((milestone, index) => {
              const isLeft = index % 2 === 0
              const Icon = milestone.icon

              return (
                <Reveal
                  key={milestone.title}
                  direction={isLeft ? 'left' : 'right'}
                  delay={0}
                  className="relative"
                >
                  <div className={`md:flex md:items-center ${isLeft ? '' : 'md:flex-row-reverse'}`}>
                    <div className="hidden md:block md:w-1/2" />

                    <div className="absolute left-4 md:left-1/2 top-1.5 -translate-x-1/2 md:-translate-x-1/2 z-10">
                      <div className="relative w-4 h-4">
                        <div className="absolute inset-0 rounded-full bg-neon-cyan/30 animate-pulse-dot" />
                        <div className="absolute inset-1 rounded-full bg-gradient-to-br from-neon-cyan to-neon-violet" />
                      </div>
                    </div>

                    <div className={`pl-12 md:w-1/2 md:pl-0 ${isLeft ? 'md:pr-12' : 'md:pl-12'}`}>
                      <div className="glass-card group p-6 relative overflow-hidden transition-all duration-500 hover:border-neon-cyan/40 hover:shadow-[0_0_36px_rgba(34,211,238,0.12)]">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 rounded-lg border border-neon-cyan/20 bg-[#0e1024]">
                            <Icon size={18} className="text-neon-cyan" />
                          </div>
                          <span className="chip text-[11px] uppercase tracking-wider text-neon-cyan border-neon-cyan/30">
                            {milestone.period}
                          </span>
                        </div>

                        <h3 className="heading text-xl font-semibold text-white mb-1">{milestone.title}</h3>
                        <p className="text-sm text-neon-cyan/90 mb-3">{milestone.place}</p>
                        <p className="text-sm text-slate-400 leading-relaxed mb-4">{milestone.description}</p>

                        <div className="flex flex-wrap gap-1.5">
                          {milestone.tags.map((tag) => (
                            <span key={tag} className="chip text-[11px]">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>

        <Reveal className="mt-20 text-center">
          <div className="inline-flex items-center gap-3 glass-card px-6 py-4">
            <Rocket size={20} className="text-neon-cyan" />
            <p className="text-sm text-slate-300">
              Et maintenant : prêt à mettre ce parcours au service d&apos;un projet ambitieux.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
