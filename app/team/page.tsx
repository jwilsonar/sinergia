'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Nav } from '@/components/layout/nav'
import { Footer } from '@/components/layout/footer'

// Flat-top hexagon clip-path
const HEX_CLIP = 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)'

// Layout constants — hex cards + ring (scaled ~20% vs original base)
const W = 276   // hex width px
const H = 239   // hex height px (W * √3/2)
const R = 306   // ring radius (center → hex center)
const CW = 936  // container width
const CH = 907  // container height
const CX = 468  // container center x
const CY = 453  // container center y (CH / 2)

type HexItem = {
  name: string
  role: string
  roleColor: string
  glowColor: string
  photo: string
  angleDeg: number // 0=right, 90=top (math convention, y flipped for CSS)
  delay: number
}

const HEX_ITEMS: HexItem[] = [
  {
    name: 'Victor',
    role: 'Director Creativo',
    roleColor: '#D4C84A',
    glowColor: 'rgba(212,200,74,0.55)',
    photo: '/team/victor.jpg',
    angleDeg: 90,
    delay: 0.05,
  },
  {
    name: 'Tino',
    role: 'Estratega de Marca',
    roleColor: '#3D8EE8',
    glowColor: 'rgba(61,142,232,0.55)',
    photo: '/team/tino.jpg',
    angleDeg: 30,
    delay: 0.15,
  },
  {
    name: 'Ricardo',
    role: 'Tech Lead',
    roleColor: '#F07030',
    glowColor: 'rgba(240,112,48,0.55)',
    photo: '/team/richi.jpg',
    angleDeg: -30,
    delay: 0.25,
  },
  {
    name: 'Sinergia',
    role: 'El Equipo',
    roleColor: '#F0EFE8',
    glowColor: 'rgba(240,239,232,0.35)',
    photo: '/team/grupo.jpg',
    angleDeg: -90,
    delay: 0.1,
  },
  {
    name: 'Whilmers',
    role: 'Multimedia',
    roleColor: '#3D8EE8',
    glowColor: 'rgba(61,142,232,0.55)',
    photo: '/team/whilmers.jpg',
    angleDeg: -150,
    delay: 0.2,
  },
  {
    name: 'Aracely',
    role: 'UI / UX',
    roleColor: '#D4C84A',
    glowColor: 'rgba(212,200,74,0.55)',
    photo: '/team/aracely.jpg',
    angleDeg: 150,
    delay: 0.3,
  },
]

function hexPos(angleDeg: number): { left: number; top: number } {
  const rad = (angleDeg * Math.PI) / 180
  return {
    left: Math.round(CX + R * Math.cos(rad) - W / 2),
    top: Math.round(CY - R * Math.sin(rad) - H / 2),
  }
}

function HexCard({ item }: { item: HexItem }) {
  const pos = hexPos(item.angleDeg)
  return (
    <motion.div
      className="absolute group cursor-pointer"
      style={{ width: W, height: H, left: pos.left, top: pos.top }}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.55, delay: item.delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{
        scale: 1.08,
        filter: `drop-shadow(0 0 22px ${item.glowColor})`,
        zIndex: 10,
        transition: { duration: 0.25 },
      }}
    >
      {/* Hex shape */}
      <div
        className="w-full h-full overflow-hidden relative"
        style={{ clipPath: HEX_CLIP }}
      >
        <Image
          src={item.photo}
          alt={item.name}
          fill
          sizes={`${W}px`}
          className="object-cover object-top transition-transform duration-500 group-hover:scale-110"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/85" />

        {/* Info — always visible at bottom */}
        <div className="absolute bottom-0 left-0 right-0 pb-5 pt-10 flex flex-col items-center text-center">
          <span
            className="text-[0.68rem] font-bold tracking-[0.14em] uppercase leading-none mb-1"
            style={{ color: item.roleColor }}
          >
            {item.role}
          </span>
          <span className="text-[1rem] font-extrabold tracking-[-0.01em] text-white leading-none">
            {item.name}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

// Mobile card (no clip-path, clean rectangular with rounded hex feel)
function MobileCard({ item, index }: { item: HexItem; index: number }) {
  return (
    <motion.div
      className="relative overflow-hidden rounded-3xl aspect-square cursor-pointer group min-h-[140px]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: 'easeOut' }}
    >
      <Image
        src={item.photo}
        alt={item.name}
        fill
        sizes="50vw"
        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80" />
      <div className="absolute bottom-0 left-0 right-0 p-5 text-center">
        <div className="text-[0.72rem] font-bold tracking-[0.12em] uppercase" style={{ color: item.roleColor }}>
          {item.role}
        </div>
        <div className="text-[1.1rem] font-extrabold text-white">{item.name}</div>
      </div>
    </motion.div>
  )
}

const VALUES = [
  { label: 'Autenticidad', color: 'text-blue border-[rgba(61,142,232,0.3)] bg-[rgba(61,142,232,0.08)]' },
  { label: 'Resolución', color: 'text-yellow border-[rgba(212,200,74,0.3)] bg-[rgba(212,200,74,0.08)]' },
  { label: 'Dinamismo', color: 'text-blue border-[rgba(61,142,232,0.3)] bg-[rgba(61,142,232,0.08)]' },
]

export default function TeamPage() {
  return (
    <div className="bg-bg text-fg min-h-screen overflow-x-hidden">
      <Nav />

      {/* HEADER */}
      <header className="pt-[148px] px-[5vw] pb-16 relative overflow-hidden">
        <div className="absolute w-[500px] h-[400px] rounded-full blur-[120px] pointer-events-none bg-blue opacity-15 -top-20 -left-20" aria-hidden="true" />
        <div className="absolute w-[500px] h-[400px] rounded-full blur-[120px] pointer-events-none bg-yellow opacity-5 top-0 right-0" aria-hidden="true" />
        <motion.div
          className="relative z-[1] max-w-[680px]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 text-[0.72rem] font-bold tracking-[0.12em] uppercase text-yellow bg-[rgba(212,200,74,0.1)] border border-[rgba(212,200,74,0.2)] rounded-full py-1.5 px-3.5 mb-5">
            <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
              <polygon points="5,0 9.3,2.5 9.3,7.5 5,10 0.7,7.5 0.7,2.5" fill="#D4C84A" />
            </svg>
            Nuestro Equipo
          </div>
          <h1 className="text-[clamp(2.4rem,4vw,4.5rem)] font-black leading-[1.05] tracking-[-0.03em] mb-5">
            La agencia que se<br />integra a tu marca
          </h1>
          <p className="text-[1.05rem] leading-[1.7] text-fg/55 max-w-[520px]">
            Conectamos con la esencia de tu marca desde dentro, y transformamos cada pieza de tu comunicación en un mensaje más fuerte.
          </p>
        </motion.div>
      </header>

      {/* HEX RING — desktop */}
      <section className="hidden md:flex justify-center items-center pb-10">
        <div
          className="relative"
          style={{ width: CW, height: CH }}
          aria-label="Equipo Sinergia"
        >
          {/* Subtle radial glow at center */}
          <div
            className="absolute pointer-events-none"
            style={{
              left: CX - 288,
              top: CY - 288,
              width: 576,
              height: 576,
              background: 'radial-gradient(circle, rgba(61,142,232,0.06) 0%, transparent 70%)',
              borderRadius: '50%',
            }}
            aria-hidden="true"
          />
          {/* Center decorative lines */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.04]"
            viewBox={`0 0 ${CW} ${CH}`}
            fill="none"
            aria-hidden="true"
          >
            {HEX_ITEMS.map((item, i) => {
              const pos = hexPos(item.angleDeg)
              return (
                <line
                  key={i}
                  x1={CX}
                  y1={CY}
                  x2={pos.left + W / 2}
                  y2={pos.top + H / 2}
                  stroke="white"
                  strokeWidth="1"
                />
              )
            })}
            <circle cx={CX} cy={CY} r="6" fill="white" />
          </svg>

          {HEX_ITEMS.map((item) => (
            <HexCard key={item.name} item={item} />
          ))}
        </div>
      </section>

      {/* MOBILE GRID */}
      <section className="md:hidden px-[5vw] pb-16 grid grid-cols-2 gap-5">
        {HEX_ITEMS.map((item, i) => (
          <MobileCard key={item.name} item={item} index={i} />
        ))}
      </section>

      {/* MISSION & VISION */}
      <motion.section
        className="mx-[5vw] mb-24 bg-bg2 border border-white/5 rounded-[20px] py-12 px-[clamp(28px,52px,52px)] grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 items-center relative overflow-hidden"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <svg
          className="absolute -right-15 -top-15 w-[240px] opacity-5 pointer-events-none"
          viewBox="0 0 200 200"
          aria-hidden="true"
        >
          <polygon points="100,10 182,55 182,145 100,190 18,145 18,55" fill="var(--blue)" />
          <polygon points="100,30 162,65 162,135 100,170 38,135 38,65" fill="none" stroke="var(--blue)" strokeWidth="1" />
        </svg>

        <div>
          <h3 className="text-[1.6rem] font-black tracking-[-0.03em] mb-2.5">Nuestra Misión</h3>
          <p className="text-[0.9rem] text-fg/55 leading-[1.65] max-w-[480px] mb-6">
            Transformar la comunicación de las marcas integrándonos en su esencia, creando estrategias sólidas y creativas que resuenen auténticamente.
          </p>
          <h3 className="text-[1.6rem] font-black tracking-[-0.03em] mb-2.5">Nuestra Visión</h3>
          <p className="text-[0.9rem] text-fg/55 leading-[1.65] max-w-[480px]">
            Ser el motor de cambio que impulse a las marcas a alcanzar su máximo potencial mediante una sinergia perfecta de talento, innovación y diseño.
          </p>
        </div>

        <div className="flex flex-col gap-4 min-w-[180px]">
          <h4 className="text-yellow font-extrabold text-[1.1rem] m-0">Nuestros Valores</h4>
          {VALUES.map(({ label, color }) => (
            <div
              key={label}
              className={`text-[0.72rem] font-semibold py-2 px-3 rounded-full border tracking-[0.02em] text-center ${color}`}
            >
              {label}
            </div>
          ))}
        </div>
      </motion.section>

      <Footer />
    </div>
  )
}
