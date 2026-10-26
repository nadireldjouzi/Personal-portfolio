import { Github, Linkedin, Mail, TerminalSquare } from 'lucide-react'

export function Footer() {
  const year = new Date().getFullYear()

  const navLinks = [
    { label: 'À propos', href: '#about' },
    { label: 'Compétences', href: '#skills' },
    { label: 'Projets', href: '#projects' },
    { label: 'Parcours', href: '#parcours' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <footer className="relative z-10 border-t border-neon-cyan/10 bg-[#070716]/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
          <a href="#home" className="flex items-center gap-2 heading text-lg font-bold gradient-text">
            <TerminalSquare size={20} className="text-neon-cyan" />
            Nadir Eldjouzi
          </a>

          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-slate-400 hover:text-white transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex gap-3">
            {[
              { icon: Github, href: 'https://github.com/nadir-eldjouzi', label: 'GitHub' },
              { icon: Linkedin, href: 'https://www.linkedin.com/in/nadir-eldjouzi-a316432aa/', label: 'LinkedIn' },
              { icon: Mail, href: 'mailto:nadironadiro44@gmail.com', label: 'Email' },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="p-2.5 border border-neon-cyan/20 rounded-lg text-slate-300 hover:text-neon-cyan hover:border-neon-cyan/50 transition-all duration-300 hover:-translate-y-0.5"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div className="border-t border-neon-cyan/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            © {year} Nadir Eldjouzi — Ingénieur Systèmes Informatiques.
          </p>
          <p className="text-xs text-slate-600 font-mono">
            {'All rights reserved © 2020'}
          </p>
        </div>
      </div>
    </footer>
  )
}
