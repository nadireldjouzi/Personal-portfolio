'use client'

import {
  BrainCircuit,
  Briefcase,
  Code2,
  Cpu,
  Layers,
  Network,
  Sparkles,
  Check,
} from 'lucide-react'
import { Card3D } from './3d-card'
import { Reveal } from './reveal'

const poles = [
  {
    icon: Network,
    title: 'Réseaux & Sécurité',
    subtitle: 'Concevoir, déployer et sécuriser des infrastructures réseau',
    items: [
      'Administration réseaux : routage, DHCP, DNS (BIND9)',
      'Sécurité informatique : pare-feux, VPN, détection d’intrusion, certification numérique',
      'Protocoles TCP/IP, HTTP, FTP, SMTP — réseaux sans fil et réseaux de capteurs',
    ],
    tags: ['BIND9', 'VPN', 'Pare-feux', 'IDS', 'TCP/IP'],
    glow: 'hover:shadow-[0_0_40px_rgba(34,211,238,0.15)]',
    iconColor: 'text-neon-cyan',
    bar: 'from-neon-cyan to-neon-blue',
  },
  {
    icon: Cpu,
    title: 'Systèmes & Architecture',
    subtitle: 'Des OS temps réel aux architectures réparties et matérielles',
    items: [
      'Systèmes d’exploitation : multitâche, temps réel, systèmes nomades',
      'Architectures logicielles réparties : CORBA, Web Services, J2EE, P2P',
      'Architectures matérielles : microcontrôleurs, ARM, FPGA',
      'Administration système Linux / Windows',
    ],
    tags: ['Linux', 'J2EE', 'Web Services', 'ARM', 'FPGA'],
    glow: 'hover:shadow-[0_0_40px_rgba(56,189,248,0.15)]',
    iconColor: 'text-neon-blue',
    bar: 'from-neon-blue to-neon-cyan',
  },
  {
    icon: BrainCircuit,
    title: 'Données & Intelligence Artificielle',
    subtitle: 'Modéliser, massifier et exploiter la donnée intelligente',
    items: [
      'Bases de données avancées : BD objet, BD spatiales, XML',
      'Big Data & Cloud Computing : NoSQL, approche SOA',
      'Fondements de l’IA : systèmes experts, planification, résolution de problèmes',
    ],
    tags: ['NoSQL', 'Big Data', 'Cloud', 'XML', 'Systèmes experts'],
    glow: 'hover:shadow-[0_0_40px_rgba(167,139,250,0.15)]',
    iconColor: 'text-neon-violet',
    bar: 'from-neon-violet to-neon-pink',
  },
  {
    icon: Code2,
    title: 'Développement & Web',
    subtitle: 'Construire des logiciels robustes, du langage au déploiement',
    items: [
      'Langages : Java, C/C++, C#, PHP, Python, SQL',
      'Techniques de programmation web et langages orientés objet',
      'Génie logiciel et vérification / validation (model-checking, LTL/CTL)',
    ],
    tags: ['Java', 'C / C++', 'Python', 'PHP', 'SQL'],
    glow: 'hover:shadow-[0_0_40px_rgba(240,171,252,0.15)]',
    iconColor: 'text-neon-pink',
    bar: 'from-neon-pink to-neon-violet',
  },
  {
    icon: Briefcase,
    title: 'Gestion de projet & Soft Skills',
    subtitle: 'Mener des projets de la vision au livrable',
    items: [
      'Gestion de projets et méthodologies de développement',
      'Entrepreneuriat et création d’entreprise',
      'Communication technique : rédaction scientifique, anglais professionnel',
    ],
    tags: ['Gestion de projet', 'Agile', 'Anglais', 'Rédaction'],
    glow: 'hover:shadow-[0_0_40px_rgba(148,163,184,0.2)]',
    iconColor: 'text-slate-300',
    bar: 'from-slate-400 to-neon-blue',
  },
  {
    icon: Layers,
    title: 'Compétences transverses',
    subtitle: 'Les fondations réutilisées sur chaque projet',
    items: [
      'Outillage : Git, Docker, CI/CD, REST APIs',
      'Bases solides en algorithmique et structures de données',
      'Culture système : performance, observabilité, conception évolutive',
    ],
    tags: ['Git', 'Docker', 'CI/CD', 'REST', 'Linux'],
    glow: 'hover:shadow-[0_0_40px_rgba(34,211,238,0.12)]',
    iconColor: 'text-neon-cyan',
    bar: 'from-neon-cyan to-neon-violet',
  },
]

export function Skills() {
  return (
    <section id="skills" className="relative z-10 py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-16">
          <span className="section-label">Compétences</span>
          <h2 className="heading mt-4 text-4xl md:text-5xl font-bold gradient-text">
            Cinq pôles, un profil d&apos;ingénieur complet
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto mt-4">
            Organisées autour des enseignements du Master Systèmes Informatiques, mes compétences
            couvrent toute la chaîne : de l&apos;infrastructure réseau jusqu&apos;à l&apos;intelligence
            artificielle, en passant par le développement et la conduite de projet.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {poles.map((pole, index) => (
            <Reveal key={pole.title} delay={(index % 3) * 100} className="h-full">
              <Card3D intensity={7} className="h-full">
                <article
                  className={`glass-card group relative flex h-full flex-col p-6 transition-shadow duration-500 ${pole.glow}`}
                >
                  <div className={`absolute inset-x-6 top-0 h-px bg-gradient-to-r ${pole.bar} opacity-60`} />

                  <div className="flex items-center gap-3 mb-5">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-xl bg-neon-cyan/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative p-2.5 rounded-xl border border-neon-cyan/20 bg-[#0e1024]">
                        <pole.icon size={22} className={pole.iconColor} />
                      </div>
                    </div>
                    <h3 className="heading text-lg font-semibold text-white leading-tight">{pole.title}</h3>
                  </div>

                  <p className="text-sm text-slate-400 mb-5">{pole.subtitle}</p>

                  <ul className="space-y-2.5 mb-6 flex-1">
                    {pole.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-slate-300">
                        <Check size={15} className={`${pole.iconColor} flex-shrink-0 mt-0.5`} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-neon-cyan/10">
                    {pole.tags.map((tag) => (
                      <span key={tag} className="chip text-[11px]">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Sparkles
                    size={18}
                    className={`absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${pole.iconColor}`}
                  />
                </article>
              </Card3D>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
