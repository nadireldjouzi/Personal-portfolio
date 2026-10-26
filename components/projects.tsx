'use client'

import { ExternalLink, FolderGit2, Github } from 'lucide-react'
import { Card3D } from './3d-card'
import { Reveal } from './reveal'

const projects = [
  {
    id: '1',
    icon: '🛍️',
    title: 'Plateforme E-Commerce',
    category: 'Full-Stack',
    description:
      'Solution e-commerce complète : interface React responsive, API REST Node.js, base PostgreSQL et paiement sécurisé Stripe.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'JWT'],
    github: 'https://github.com/nadir-eldjouzi',
    demo: '#',
    accent: 'from-neon-cyan/20',
  },
  {
    id: '5',
    icon: '📋',
    title: 'Guide Démarche DZ',
    category: 'Administratif',
    description:
      'Guide administratif complet pour les citoyens algériens : pièces exigibles, timbres fiscaux en vigueur, délais moyens et guichets compétents pour l’ensemble des démarches quotidiennes.',
    tags: ['Algérie', 'Administratif', 'Guichets', 'Timbres fiscaux'],
    github: '#',
    demo: '#',
    accent: 'from-neon-cyan/20',
  },
{
    id: '2',
    icon: '🎓',
    title: 'Système de Gestion Scolaire',
    category: 'Systèmes & Données',
    description:
      'Plateforme éducative Next.js / MongoDB : inscriptions, emplois du temps, bulletins, messagerie temps réel et rôles par profil.',
    tags: ['Next.js', 'TypeScript', 'MongoDB', 'Socket.io'],
    github: 'https://github.com/nadir-eldjouzi',
    demo: '#',
    accent: 'from-neon-blue/20',
  },
  {
    id: '6',
    icon: '🏫',
    title: 'Gestion École Tatwir',
    category: 'Formation',
    description:
      'Plateforme de gestion scolaire complète pour l\'école Tatwir : inscriptions, suivi des élèves, gestion des cours et des employés, et tableau de bord administratif.',
    tags: ['Tatwir', 'Scolaire', 'Gestion', 'Éducation'],
    github: '#',
    demo: '#',
    accent: 'from-neon-blue/20',
  },
{
    id: '3',
    icon: '🌐',
    title: 'Infrastructure Réseau d\'Entreprise',
    category: 'Réseaux & Sécurité',
    description:
      'Conception réseau : segmentation VLAN, pare-feu avec ACL, VPN pour accès distant sécurisé et supervision des équipements.',
    tags: ['Cisco', 'VLAN', 'VPN', 'Pare-feu', 'ACL'],
    github: '#',
    demo: '#',
    accent: 'from-neon-violet/20',
  },
  {
    id: '7',
    icon: '🚀',
    title: 'Mounasaba.DZ - Plateforme Événementielle',
    category: 'Startup',
    description:
      'Plateforme de mise en relation pour l\'événementiel : salles et prestataires disponibles pour mariages, anniversaires, conférences et soirées privées.',
    tags: ['Mounasaba', 'Événementiel', 'Salles', 'Prestataires'],
    github: '#',
    demo: '#',
    accent: 'from-neon-violet/20',
  },
  {
    id: '8',
    icon: '🛒',
    title: 'ServiGo — Marketplace Missions Courtes (Co-Founder)',
    category: 'Marketplace / Startup',
    description:
      'Marketplace web connectant employeurs (travaux, aide à domicile, services) et travailleurs disponibles à proximité. Publication de mission en minutes, candidature immédiate, suivi clair. Co-fondateur — produit, tech, opérations.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Socket.io', 'Docker'],
    github: '#',
    demo: '#',
    accent: 'from-neon-orange/20',
  },
]

export function Projects() {
  return (
    <section id="projects" className="relative z-10 py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-16">
          <span className="section-label">Projets</span>
          <h2 className="heading mt-4 text-4xl md:text-5xl font-bold gradient-text">
            Des projets concrets, de l&apos;idée au déploiement
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto mt-4">
            Des applications full-stack aux infrastructures réseau, chaque projet illustre une
            compétence clé de mon parcours d&apos;ingénieur.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={(index % 2) * 120} className="h-full">
              <Card3D intensity={8} className="h-full">
                <article className="glass-card group relative flex h-full flex-col overflow-hidden transition-shadow duration-500 hover:shadow-[0_0_44px_rgba(34,211,238,0.14)]">
                  <div
                    className={`absolute -top-16 -right-16 w-56 h-56 rounded-full bg-gradient-to-br ${project.accent} to-transparent blur-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-700`}
                  />

                  <div className="relative p-6 md:p-7 flex-1 flex flex-col">
                    <div className="flex items-start justify-between mb-5">
                      <div className="flex items-center gap-3">
                        <div className="text-4xl group-hover:scale-125 transition-transform duration-500">
                          {project.icon}
                        </div>
                        <span className="chip">{project.category}</span>
                      </div>
                      <FolderGit2 size={18} className="text-slate-500 group-hover:text-neon-cyan transition-colors" />
                    </div>

                    <h3 className="heading text-xl md:text-2xl font-semibold text-white mb-3 group-hover:text-neon-cyan transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed mb-6 flex-1">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.tags.map((tag) => (
                        <span key={tag} className="chip text-[11px]">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      {project.github && project.github !== '#' && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Code source de ${project.title}`}
                          className="btn-outline-neon px-4 py-2 text-xs"
                        >
                          <Github size={14} />
                          Code
                        </a>
                      )}
                      {project.demo && project.demo !== '#' && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Démo de ${project.title}`}
                          className="btn-glow px-4 py-2 text-xs"
                        >
                          <ExternalLink size={14} />
                          Démo
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="relative h-px mx-6 bg-gradient-to-r from-neon-cyan/40 via-neon-violet/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </article>
              </Card3D>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
