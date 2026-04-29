'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Nav } from '@/components/layout/nav'
import { Footer } from '@/components/layout/footer'
import { PROJECTS, type Project } from '@/lib/data/projects'

const FILTERS = [
  { key: 'all', label: 'Todos' },
  { key: 'marca', label: 'Marca' },
  { key: 'digital', label: 'Digital' },
  { key: 'campaña', label: 'Campaña' },
  { key: 'diseño', label: 'Diseño' },
] as const

type FilterKey = typeof FILTERS[number]['key']

function ProjectThumb({ proj }: { proj: Project }) {
  return (
    <div className={`relative overflow-hidden ${proj.large ? 'h-[280px]' : 'h-[220px]'}`}>
      {proj.image ? (
        <div className="w-full h-full relative">
          <Image
            src={proj.image}
            alt={proj.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      ) : (
        <div className={`w-full h-full flex items-center justify-center relative overflow-hidden ${proj.bg}`}>
          <svg
            className="opacity-[0.12]"
            width={proj.hexSize}
            height={proj.hexSize}
            viewBox="0 0 100 100"
            aria-hidden="true"
          >
            <polygon
              points="50,5 92,27.5 92,72.5 50,95 8,72.5 8,27.5"
              fill="none"
              stroke={proj.hexStroke}
              strokeWidth="1.5"
            />
            {proj.hexInner && (
              <polygon
                points="50,18 79,34 79,66 50,82 21,66 21,34"
                fill="none"
                stroke={proj.hexStroke}
                strokeWidth="1"
                opacity="0.5"
              />
            )}
          </svg>
          <div className="text-[0.72rem] font-semibold font-mono tracking-[0.05em] text-[rgba(240,239,232,0.25)] text-center p-3 absolute bottom-3 left-0 right-0">
            {proj.thumbLabel}
          </div>
        </div>
      )}
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 transition-opacity duration-250 group-hover:opacity-100 motion-reduce:transition-none">
        <button
          className="bg-[rgba(240,239,232,0.95)] text-[#121212] font-bold text-[0.8rem] py-2.5 px-5 rounded-full border-none cursor-pointer translate-y-2 transition-transform duration-250 group-hover:translate-y-0 motion-reduce:transition-none"
          type="button"
        >
          Ver Caso de Estudio →
        </button>
      </div>
    </div>
  )
}

function ProjectCard({ proj }: { proj: Project }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 22 }}
      transition={{ duration: 0.4, delay: proj.delay, ease: [0.22, 1, 0.36, 1] }}
      className={`bg-white/5 border border-white/5 rounded-[20px] overflow-hidden relative cursor-pointer transition-all duration-250 hover:-translate-y-1.5 hover:border-white/10 group ${proj.span} ${proj.hoverShadow}`}
    >
      <Link href={`/projects/${proj.slug}`} className="block h-full w-full">
        <ProjectThumb proj={proj} />
        <div className="pt-[22px] px-6 pb-[26px]">
          <div className="flex gap-2.5 items-center mb-2.5">
            {proj.tagLabels.map((label) => (
              <span
                key={label}
                className={`text-[0.68rem] font-bold tracking-[0.08em] uppercase py-[3px] px-2.5 rounded-full border ${proj.tagColor}`}
              >
                {label}
              </span>
            ))}
            <span className="text-[0.72rem] text-fg/55 font-medium">{proj.year}</span>
          </div>
          <div className="text-[1.15rem] font-extrabold tracking-[-0.02em] mb-2 leading-[1.25]">{proj.title}</div>
          <div className="text-[0.83rem] leading-[1.62] text-fg/55">{proj.desc}</div>
          {proj.stats && (
            <div className="flex gap-5 mt-4 pt-4 border-t border-white/5">
              {proj.stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-[1.1rem] font-extrabold tracking-[-0.02em]" style={{ color: stat.color }}>
                    {stat.num}
                  </div>
                  <div className="text-[0.7rem] text-fg/55 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Link>
    </motion.article>
  )
}

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all')

  const filtered = activeFilter === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => p.tags.includes(activeFilter))

  return (
    <div className="bg-bg text-fg min-h-screen overflow-x-hidden">
      <Nav />

      {/* PAGE HEADER */}
      <header className="pt-[148px] px-[5vw] pb-20 relative overflow-hidden">
        <div className="absolute w-[500px] h-[400px] rounded-full blur-[120px] pointer-events-none bg-orange opacity-10 -top-20 -right-20" aria-hidden="true" />
        <div className="absolute w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none bg-blue opacity-[0.08] top-10 -left-15" aria-hidden="true" />
        <motion.div
          className="relative z-[1]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 text-[0.72rem] font-bold tracking-[0.12em] uppercase text-orange bg-[rgba(240,112,48,0.1)] border border-[rgba(240,112,48,0.2)] rounded-full py-1.5 px-3.5 mb-5">
            <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
              <polygon points="5,0 9.3,2.5 9.3,7.5 5,10 0.7,7.5 0.7,2.5" fill="#F07030" />
            </svg>
            Nuestro Trabajo
          </div>
          <h1 className="text-[clamp(2.4rem,4vw,4.5rem)] font-black leading-[1.05] tracking-[-0.03em] mb-4">
            Construido con<br />
            <span className="text-orange">intención.</span>
          </h1>
          <p className="text-base leading-[1.7] text-fg/55 max-w-[500px]">
            Una selección de campañas, identidades y experiencias digitales que hemos creado para MYPES que se atrevieron a destacar.
          </p>
        </motion.div>
      </header>

      {/* FILTER TABS */}
      <div className="flex gap-2.5 flex-wrap px-[5vw] pb-[52px]" role="group" aria-label="Filtrar proyectos por categoría">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            className={`text-[0.8rem] font-semibold py-2 px-5 rounded-full border cursor-pointer transition-all duration-200 tracking-[0.02em] ${
              activeFilter === f.key
                ? 'bg-fg text-bg border-fg'
                : 'bg-white/5 text-fg/55 border-white/5 hover:text-fg hover:border-white/20'
            }`}
            onClick={() => setActiveFilter(f.key)}
            aria-pressed={activeFilter === f.key}
            type="button"
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* PROJECTS GRID */}
      <section className="px-[5vw] pb-[100px]">
        <motion.div layout className="grid grid-cols-12 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((proj) => (
              <ProjectCard key={proj.id} proj={proj} />
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* CTA STRIP */}
      <motion.div
        className="mx-[5vw] mb-20 rounded-[20px] md:p-[60px_52px] p-[40px_28px] relative overflow-hidden bg-bg2 border border-white/5 text-center"
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="absolute w-[400px] h-[300px] rounded-full blur-[90px] pointer-events-none bg-blue opacity-10 -top-20 -left-20" aria-hidden="true" />
        <div className="absolute w-[400px] h-[300px] rounded-full blur-[90px] pointer-events-none bg-orange opacity-10 -bottom-20 -right-20" aria-hidden="true" />
        <div className="relative z-[1]">
          <h2 className="text-[clamp(1.8rem,3vw,2.8rem)] font-black tracking-[-0.03em] mb-3.5">
            Tu proyecto podría ser el siguiente.
          </h2>
          <p className="text-base text-fg/55 mb-8">
            Cuéntanos lo que estás construyendo — nosotros aportaremos la estrategia, el diseño y la ejecución.
          </p>
          <Link
            href="/#contact"
            className="bg-orange text-white py-3.5 px-9 rounded-[10px] font-bold text-base transition-all duration-200 hover:bg-[#F99D76] hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(240,112,48,0.35)] inline-block"
          >
            Empezar una Conversación →
          </Link>
        </div>
      </motion.div>

      <Footer />
    </div>
  )
}
