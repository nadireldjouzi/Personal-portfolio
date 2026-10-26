'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Menu, X, TerminalSquare } from 'lucide-react'

const navItems = [
  { label: 'Accueil', href: '#home' },
  { label: 'À propos', href: '#about' },
  { label: 'Compétences', href: '#skills' },
  { label: 'Projets', href: '#projects' },
  { label: 'Parcours', href: '#parcours' },
  { label: 'Contact', href: '#contact' },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('#home')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)

      const sections = navItems
        .map((item) => document.getElementById(item.href.slice(1)))
        .filter((el): el is HTMLElement => !!el)

      let current = navItems[0].href
      for (const section of sections) {
        if (window.scrollY + 120 >= section.offsetTop) {
          current = `#${section.id}`
        }
      }
      setActive(current)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0a0a1a]/85 backdrop-blur-xl border-b border-neon-cyan/15 shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            href="#home"
            className="flex items-center gap-2 text-lg font-heading font-bold gradient-text hover:scale-105 transition-transform duration-300"
          >
            <TerminalSquare size={20} className="text-neon-cyan" />
            Nadir Eldjouzi
          </Link>

          <div className="hidden md:flex items-center gap-7">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`relative text-sm font-medium transition-colors duration-300 group ${
                  active === item.href ? 'text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 rounded-full bg-gradient-to-r from-neon-cyan to-neon-violet transition-all duration-300 ${
                    active === item.href ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </a>
            ))}
          </div>

          <button
            className="md:hidden text-slate-300 hover:text-white transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-5 space-y-1 bg-[#0a0a1a]/95 backdrop-blur-xl border-t border-neon-cyan/10">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  active === item.href
                    ? 'text-white bg-neon-cyan/10 border-l-2 border-neon-cyan'
                    : 'text-slate-400 hover:text-white hover:bg-neon-cyan/5 border-l-2 border-transparent'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
