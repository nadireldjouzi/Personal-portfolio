'use client'

import { Code2, Database, GraduationCap, Network, ShieldCheck } from 'lucide-react'
import { Reveal } from './reveal'

const domains = [
  {
    icon: Network,
    title: 'Réseaux & Infrastructure',
    skills: ['Routage', 'DHCP / DNS', 'VPN', 'Réseaux de capteurs'],
    accent: 'from-neon-cyan/20',
  },
  {
    icon: Code2,
    title: 'Développement & Web',
    skills: ['Java', 'C / C++', 'Python', 'PHP', 'SQL'],
    accent: 'from-neon-blue/20',
  },
  {
    icon: Database,
    title: 'Data & IA',
    skills: ['Big Data', 'NoSQL', 'Cloud', 'Systèmes experts'],
    accent: 'from-neon-violet/20',
  },
  {
    icon: ShieldCheck,
    title: 'Sécurité & Systèmes',
    skills: ['Pare-feux', 'Détection d’intrusion', 'Linux', 'Temps réel'],
    accent: 'from-neon-pink/20',
  },
]

export function About() {
  return (
    <section id="about" className="relative z-10 py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-16">
          <span className="section-label mb-4">À propos</span>
          <h2 className="heading mt-4 text-4xl md:text-5xl font-bold gradient-text">
            Un profil généraliste, du réseau à l&apos;intelligence artificielle
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          <Reveal direction="left" className="lg:col-span-3 space-y-5">
            <p className="text-slate-300 leading-relaxed">
              Titulaire d&apos;un <strong className="text-white">Master degree en Software Engineering</strong> de
              l&apos;Université Mouloud Mammeri de Tizi-Ouzou (UMMTO), je combine une{' '}
              <strong className="text-white">double compétence système & développement</strong> : de
              l&apos;administration des réseaux et des systèmes à la conception d&apos;applications web,
              en passant par les bases de données, le cloud et l&apos;intelligence artificielle.
            </p>
            <p className="text-slate-400 leading-relaxed">
              Ce parcours m&apos;a appris à raisonner en ingénieur : comprendre chaque couche d&apos;une
              architecture, de la carte réseau au service web, et faire dialoguer des technologies
              différentes au sein d&apos;un même système. Je conçois des solutions complètes, fiables et
              maintenables, en gardant toujours un œil sur la performance et la sécurité.
            </p>
            <p className="text-slate-400 leading-relaxed">
              Curieux et rigoureux, j&apos;aime relever des défis techniques variés — déployer une
              infrastructure réseau, modéliser une base de données avancée, ou entraîner un système
              intelligent — avec la même exigence : livrer un résultat concret et vérifiable.
            </p>

            <div className="glass-card p-6 mt-4 flex items-start gap-4">
              <GraduationCap size={28} className="text-neon-cyan flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="heading text-lg font-semibold text-white">Master Systèmes Informatiques</h3>
                <p className="text-sm text-slate-400 mt-1">
                  UMMTO — Université Mouloud Mammeri de Tizi-Ouzou · Systèmes &amp; Réseaux
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {['Réseaux & NTIC', 'Systèmes répartis', 'Bases de données', 'Big Data', 'IA'].map((t) => (
                    <span key={t} className="chip">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {domains.map((domain, i) => (
              <Reveal key={domain.title} direction="right" delay={i * 100}>
                <div className="glass-card group p-5 h-full transition-all duration-300 hover:border-neon-cyan/40 hover:shadow-[0_0_32px_rgba(34,211,238,0.12)]">
                  <div className={`inline-flex p-2.5 rounded-xl bg-gradient-to-br ${domain.accent} to-transparent mb-3`}>
                    <domain.icon size={20} className="text-neon-cyan group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="heading text-base font-semibold text-white mb-2">{domain.title}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {domain.skills.map((skill) => (
                      <span key={skill} className="chip text-[11px]">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
