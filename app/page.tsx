'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { BackgroundPathsLayer } from '@/components/ui/background-paths'
import { Nav } from '@/components/layout/nav'
import { Footer } from '@/components/layout/footer'

type FormState = {
  fname: string
  lname: string
  email: string
  service: string
  message: string
}

const MARQUEE_ITEMS = [
  { label: 'Estrategia de Marca', dotColor: '' },
  { label: 'Campañas Digitales', dotColor: 'bg-yellow' },
  { label: 'Dirección Creativa', dotColor: 'bg-orange' },
  { label: 'Diseño UX / UI', dotColor: '' },
  { label: 'Redes Sociales', dotColor: 'bg-yellow' },
  { label: 'Análisis de Datos', dotColor: 'bg-orange' },
  { label: 'Producción de Contenido', dotColor: '' },
  { label: 'Growth Marketing', dotColor: 'bg-yellow' },
]

const PAIN_POINTS = [
  {
    title: 'Comunicación Improvisada',
    desc: 'Sin una estrategia clara, el mensaje se pierde en el ruido, confunde a tu audiencia y no logra conectar.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
  },
  {
    title: 'Poco Presupuesto',
    desc: 'Sentir que necesitas mucho dinero en pautas publicitarias para poder competir y empezar a vender rápido.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    title: 'Procesos Opacos',
    desc: 'Agencias que no explican sus procesos creativos, generando desconfianza sobre dónde va tu inversión.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
      </svg>
    ),
  },
  {
    title: 'Inseguridad',
    desc: 'El temor constante a arriesgarte y contratar a una agencia que realmente no entienda la esencia de tu MYPE.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M12 8v4" />
        <path d="M12 16h.01" />
      </svg>
    ),
  },
]

const SERVICES = [
  {
    variant: 'shadow-[inset_0_0_40px_rgba(61,142,232,0.1)] bg-[rgba(61,142,232,0.05)] hover:shadow-[0_20px_60px_rgba(61,142,232,0.15)]',
    hexBg: '#3D8EE8',
    icon: (
      <svg viewBox="0 0 52 52" fill="none">
        <polygon points="26,3 48,15.5 48,36.5 26,49 4,36.5 4,15.5" fill="rgba(61, 142, 232,0.15)" stroke="#3D8EE8" strokeWidth="1.5" />
        <path d="M18 26h16M26 18v16" stroke="#3D8EE8" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
    num: '01', title: 'Estrategia', titleColor: 'text-[#3D8EE8]',
    desc: 'Entendemos bien el problema de tu MYPE antes de diseñar la solución, definiendo a tu público objetivo.',
  },
  {
    variant: 'shadow-[inset_0_0_40px_rgba(212,200,74,0.1)] bg-[rgba(212,200,74,0.05)] hover:shadow-[0_20px_60px_rgba(212,200,74,0.12)]',
    hexBg: '#D4C84A',
    icon: (
      <svg viewBox="0 0 52 52" fill="none">
        <polygon points="26,3 48,15.5 48,36.5 26,49 4,36.5 4,15.5" fill="rgba(212, 200, 74,0.15)" stroke="#D4C84A" strokeWidth="1.5" />
        <rect x="16" y="17" width="20" height="18" rx="3" stroke="#D4C84A" strokeWidth="2" fill="none" />
        <path d="M21 22h10M21 27h6" stroke="#D4C84A" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    num: '02', title: 'Identidad', titleColor: 'text-[#D4C84A]',
    desc: 'Creamos una identidad de marca clara que elimina la comunicación improvisada y genera confianza.',
  },
  {
    variant: 'shadow-[inset_0_0_40px_rgba(240,112,48,0.1)] bg-[rgba(240,112,48,0.05)] hover:shadow-[0_20px_60px_rgba(240,112,48,0.2)]',
    hexBg: '#F07030',
    icon: (
      <svg viewBox="0 0 52 52" fill="none">
        <polygon points="26,3 48,15.5 48,36.5 26,49 4,36.5 4,15.5" fill="rgba(240, 112, 48,0.15)" stroke="#F07030" strokeWidth="1.5" />
        <path d="M20 32l4-8 4 5 3-5 4 8" stroke="#F07030" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    ),
    num: '03', title: 'Campañas', titleColor: 'text-[#F07030]',
    desc: 'Optimizamos tu presupuesto limitado para que puedas vender rápido a través de canales digitales efectivos.',
  },
  {
    variant: 'shadow-[inset_0_0_40px_rgba(61,142,232,0.08)] bg-[rgba(61,142,232,0.04)] hover:shadow-[0_20px_60px_rgba(61,142,232,0.15)]',
    hexBg: '#3D8EE8',
    icon: (
      <svg viewBox="0 0 52 52" fill="none">
        <polygon points="26,3 48,15.5 48,36.5 26,49 4,36.5 4,15.5" fill="rgba(240,239,232,0.1)" stroke="#F0EFE8" strokeWidth="1.5" />
        <circle cx="26" cy="22" r="5" stroke="#F0EFE8" strokeWidth="1.8" fill="none" />
        <path d="M18 34c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="#F0EFE8" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      </svg>
    ),
    num: '04', title: 'Procesos', titleColor: 'text-[#F0EFE8]',
    desc: 'Garantizamos procesos creativos transparentes que te darán la seguridad para invertir en tu marca.',
  },
  {
    variant: 'shadow-[inset_0_0_40px_rgba(61,142,232,0.1)] bg-[rgba(61,142,232,0.05)] hover:shadow-[0_20px_60px_rgba(61,142,232,0.15)]',
    hexBg: '#3D8EE8',
    icon: (
      <svg viewBox="0 0 52 52" fill="none">
        <defs>
          <linearGradient id="techGrad" x1="0" y1="0" x2="52" y2="52" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#3D8EE8" />
            <stop offset="50%" stopColor="#D4C84A" />
            <stop offset="100%" stopColor="#3D8EE8" />
          </linearGradient>
        </defs>
        <polygon points="26,3 48,15.5 48,36.5 26,49 4,36.5 4,15.5" fill="rgba(61, 142, 232,0.12)" stroke="url(#techGrad)" strokeWidth="1.5" />
        <path d="M20 26l4 4 8-8" stroke="url(#techGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    ),
    num: '05', title: 'Crecimiento', titleColor: 'text-transparent bg-clip-text bg-gradient-to-r from-blue to-yellow',
    desc: 'La agencia que se integra a tu marca para acelerar tus ventas y escalar tu negocio.',
  },
]

export default function HomePage() {
  const [form, setForm] = useState<FormState>({ fname: '', lname: '', email: '', service: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setTimeout(() => {
      setSubmitted(true)
      setSubmitting(false)
      setTimeout(() => {
        setSubmitted(false)
        setForm({ fname: '', lname: '', email: '', service: '', message: '' })
      }, 4000)
    }, 600)
  }

  return (
    <div className="bg-bg text-fg min-h-screen overflow-x-hidden antialiased scroll-smooth">
      <Nav scrollBg />

      {/* HERO */}
      <section id="hero" className="min-h-screen grid grid-cols-1 md:grid-cols-2 items-center px-[5vw] pt-[100px] md:pt-[120px] pb-20 gap-[40px] md:gap-[60px] relative overflow-hidden text-center md:text-left">
        <BackgroundPathsLayer
          className="z-0 opacity-20"
          svgClassName="text-[#3D8EE8]"
        />
        <div className="absolute w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none z-[1] bg-blue opacity-15 top-[10%] left-[-10%]" />
        <div className="absolute w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none z-[1] bg-yellow opacity-12 bottom-[5%] right-[20%]" />
        <svg className="hidden md:block absolute right-[-120px] top-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-5 pointer-events-none z-[1]" viewBox="0 0 200 200" fill="none" aria-hidden="true">
          <polygon points="100,10 182,55 182,145 100,190 18,145 18,55" fill="none" stroke="white" strokeWidth="1" />
          <polygon points="100,28 165,65 165,139 100,176 35,139 35,65" fill="none" stroke="white" strokeWidth="0.5" />
          <polygon points="100,46 148,73 148,129 100,156 52,129 52,73" fill="none" stroke="white" strokeWidth="0.5" />
        </svg>

        <div className="relative z-[2]">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.12em] uppercase text-yellow bg-[rgba(212,200,74,0.1)] border border-[rgba(212,200,74,0.2)] rounded-full py-1.5 px-3.5 mb-6">
              <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
                <polygon points="5,0 9.3,2.5 9.3,7.5 5,10 0.7,7.5 0.7,2.5" fill="#D4C84A" />
              </svg>
              Estrategia · Diseño · Crecimiento
            </div>
            <h1 className="text-[clamp(2.4rem,4vw,4rem)] font-black leading-[1.08] tracking-[-0.03em] mb-6">
              La agencia que<br />
              se <span className="text-blue">integra</span> a tu<br />
              <span className="text-yellow">marca</span>
            </h1>
            <p className="text-[1.05rem] leading-[1.7] text-fg/55 max-w-[480px] mb-10 mx-auto md:mx-0">
              Creemos que toda gran marca nace de entender bien el problema, antes de diseñar la solución. Especializados en MYPES que buscan crecer y destacar.
            </p>
            <div className="flex gap-3.5 flex-wrap justify-center md:justify-start">
              <a href="#contact" className="bg-yellow text-[#121212] border-none py-[14px] px-8 rounded-[10px] font-extrabold text-base cursor-pointer transition-all duration-200 hover:bg-[#fde047] hover:shadow-[0_6px_24px_rgba(212,200,74,0.4)] inline-block">
                Empieza tu proyecto
              </a>
              <a href="#services" className="bg-transparent text-fg border-[1.5px] border-[rgba(61,142,232,0.3)] py-[14px] px-7 rounded-[10px] font-semibold text-base cursor-pointer transition-all duration-200 hover:border-blue hover:bg-[rgba(61,142,232,0.1)] inline-block">
                Nuestros Servicios
              </a>
            </div>
            <div className="flex flex-wrap gap-6 md:gap-10 mt-[52px] pt-10 border-t border-white/10 justify-center md:justify-start text-left">
              <div>
                <div className="text-[1.8rem] font-black tracking-[-0.03em] text-blue">50+</div>
                <div className="text-[0.78rem] text-fg/55 font-medium mt-0.5">Proyectos Lanzados</div>
              </div>
              <div>
                <div className="text-[1.8rem] font-black tracking-[-0.03em] text-yellow">5×</div>
                <div className="text-[0.78rem] text-fg/55 font-medium mt-0.5">Especialistas</div>
              </div>
              <div>
                <div className="text-[1.8rem] font-black tracking-[-0.03em] text-blue">100%</div>
                <div className="text-[0.78rem] text-fg/55 font-medium mt-0.5">Sinergia Creativa</div>
              </div>
            </div>
        </div>

        <div className="relative z-[2] flex items-center justify-center order-[-1] md:order-none">
          <div className="relative w-[min(400px,88vw)] md:w-[min(620px,52vw)] aspect-square">
            <div className="absolute -inset-3 [clip-path:polygon(50%_0%,93.3%_25%,93.3%_75%,50%_100%,6.7%_75%,6.7%_25%)] bg-gradient-to-br from-blue via-orange to-yellow z-[-1] opacity-70" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/foto_grupal.jpeg" alt="Sinergia Team" className="w-full h-full object-cover object-center [clip-path:polygon(50%_0%,93.3%_25%,93.3%_75%,50%_100%,6.7%_75%,6.7%_25%)] block" />
            <svg className="absolute opacity-85 w-16 -top-5 -left-7.5 animate-float-hex motion-reduce:animate-none" viewBox="0 0 60 60" fill="none" aria-hidden="true">
              <polygon points="30,3 55,17 55,43 30,57 5,43 5,17" fill="#3D8EE8" />
            </svg>
            <svg className="absolute opacity-85 w-11 bottom-5 -right-10 animate-float-hex-tilt [animation-delay:0.4s] motion-reduce:animate-none" viewBox="0 0 60 60" fill="none" aria-hidden="true">
              <polygon points="30,3 55,17 55,43 30,57 5,43 5,17" fill="#F07030" />
            </svg>
            <svg className="absolute opacity-85 w-9 top-[40%] -left-15 animate-float-hex-alt [animation-delay:0.85s] motion-reduce:animate-none" viewBox="0 0 60 60" fill="none" aria-hidden="true">
              <polygon points="30,3 55,17 55,43 30,57 5,43 5,17" fill="#D4C84A" />
            </svg>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="py-10 border-y border-white/10 overflow-hidden" aria-hidden="true">
        <div className="flex gap-[60px] w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="text-base font-bold tracking-[0.06em] uppercase text-fg/40 whitespace-nowrap flex items-center gap-5 cursor-default transition-colors duration-300 select-none hover:text-fg/90">
              {item.label}
              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${item.dotColor || 'bg-blue'}`} />
            </span>
          ))}
        </div>
      </div>

      {/* PAIN POINTS */}
      <section className="px-[5vw] py-[100px] bg-bg2">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="inline-flex items-center gap-2 text-[0.72rem] font-bold tracking-[0.14em] uppercase text-blue mb-4 before:content-[''] before:block before:w-5 before:h-[1.5px] before:bg-blue">El Problema</div>
          <h2 className="text-[clamp(1.8rem,3vw,3rem)] font-black leading-[1.1] tracking-[-0.03em] mb-4">Entendemos los retos<br />de tu MYPE.</h2>
          <p className="text-fg/55 text-base leading-[1.7] max-w-[540px] mb-[60px]">
            Sabemos que el camino para destacar no es fácil. Muchos negocios enfrentan los mismos obstáculos que limitan su crecimiento.
          </p>
        </motion.div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-8">
          {PAIN_POINTS.map((pt, i) => (
            <motion.div 
              key={i} 
              className="border border-[rgba(61,142,232,0.2)] rounded-3xl p-10 relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="w-14 h-14 mb-6 flex items-center justify-center bg-[rgba(212,200,74,0.1)] rounded-xl text-yellow [&>svg]:w-7 [&>svg]:h-7">{pt.icon}</div>
              <div className="text-[1.2rem] font-extrabold mb-3 text-fg">{pt.title}</div>
              <div className="text-[0.95rem] leading-[1.65] text-fg/55">{pt.desc}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="px-[5vw] py-[100px]">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="inline-flex items-center gap-2 text-[0.72rem] font-bold tracking-[0.14em] uppercase text-blue mb-4 before:content-[''] before:block before:w-5 before:h-[1.5px] before:bg-blue">Nuestros Ángulos</div>
          <h2 className="text-[clamp(1.8rem,3vw,3rem)] font-black leading-[1.1] tracking-[-0.03em] mb-4">La Solución: Cinco facetas.<br />Un equipo.</h2>
          <p className="text-fg/55 text-base leading-[1.7] max-w-[540px] mb-[60px]">
            Cada servicio es un lado del hexágono — distintivo, poderoso y perfectamente conectado a los demás.
          </p>
        </motion.div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-8">
          {SERVICES.map((svc, i) => (
            <motion.div 
              key={svc.num} 
              className={`border border-white/5 rounded-3xl py-11 px-9 relative overflow-hidden cursor-default transition-all duration-250 hover:-translate-y-1.5 hover:border-[rgba(61,142,232,0.3)] group ${svc.variant}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <svg className="absolute -right-6 -bottom-6 w-[120px] opacity-5 pointer-events-none" viewBox="0 0 100 100" aria-hidden="true">
                <polygon points="50,5 92,27.5 92,72.5 50,95 8,72.5 8,27.5" fill={svc.hexBg} />
              </svg>
              <div className="w-[60px] h-[60px] mb-6 flex items-center justify-center [&>svg]:w-[60px] [&>svg]:h-[60px] relative z-10">{svc.icon}</div>
              <div className="text-[0.75rem] font-bold tracking-[0.1em] mb-3 opacity-40 relative z-10">{svc.num}</div>
              <div className={`text-[1.35rem] font-extrabold tracking-[-0.02em] mb-3 relative z-10 ${svc.titleColor}`}>
                {svc.title}
              </div>
              <div className="text-[0.95rem] leading-[1.7] text-fg/55 relative z-10">{svc.desc}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TEAM */}
      <section id="team" className="px-[5vw] py-[100px] bg-bg2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Image
              src="/team/grupo.jpg"
              alt="Sinergia Core Team"
              width={600}
              height={450}
              className="w-full rounded-[20px] block brightness-[1.02] contrast-[1.05]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <svg className="absolute w-20 -bottom-5 -right-5 opacity-90" viewBox="0 0 80 80" fill="none" aria-hidden="true">
              <polygon points="40,4 74,23 74,61 40,76 6,61 6,23" fill="#3D8EE8" />
            </svg>
            <svg className="absolute w-14 -top-5 -left-5 opacity-90 animate-float2 motion-reduce:animate-none" viewBox="0 0 56 56" fill="none" aria-hidden="true">
              <polygon points="28,3 52,16 52,40 28,53 4,40 4,16" fill="#D4C84A" />
            </svg>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="inline-flex items-center gap-2 text-[0.72rem] font-bold tracking-[0.14em] uppercase text-blue mb-4 before:content-[''] before:block before:w-5 before:h-[1.5px] before:bg-blue">Equipo Central</div>
            <h2 className="text-[clamp(1.8rem,3vw,3rem)] font-black leading-[1.1] tracking-[-0.03em] mb-4">Diferentes ángulos.<br />Una visión.</h2>
            <p className="text-fg/55 text-base leading-[1.75] mb-8">
              No somos solo un equipo, somos un colectivo creativo. Cada uno aporta una especialidad distinta y juntos formamos algo mayor que la suma de nuestras partes. La estrategia se encuentra con el diseño. Los datos con la narrativa. La tecnología con la conexión humana.
            </p>
            <p className="text-fg/55 text-base leading-[1.75] mb-8">
              Entendemos las necesidades de las MYPES y trabajamos con marcas que creen en ideas audaces y buscan vender rápido.
            </p>
            <div className="flex flex-wrap gap-2.5 mb-9">
              <span className="text-[0.78rem] font-semibold py-1.5 px-3.5 rounded-full border border-[rgba(61,142,232,0.3)] text-blue bg-[rgba(61,142,232,0.08)]">Estratega de Marca</span>
              <span className="text-[0.78rem] font-semibold py-1.5 px-3.5 rounded-full border border-[rgba(212,200,74,0.3)] text-yellow bg-[rgba(212,200,74,0.08)]">Director Creativo</span>
              <span className="text-[0.78rem] font-semibold py-1.5 px-3.5 rounded-full border border-[rgba(61,142,232,0.3)] text-blue bg-[rgba(61,142,232,0.08)]">Growth Hacker</span>
              <span className="text-[0.78rem] font-semibold py-1.5 px-3.5 rounded-full border border-[rgba(240,112,48,0.5)] text-fg bg-[rgba(240,112,48,0.2)]">Líder Técnico</span>
              <span className="text-[0.78rem] font-semibold py-1.5 px-3.5 rounded-full border border-[rgba(212,200,74,0.3)] text-yellow bg-[rgba(212,200,74,0.08)]">Productor Multimedia</span>
            </div>
            <Link href="/team" className="bg-blue text-[#121212] border-none py-2.5 px-5.5 rounded-lg font-extrabold text-sm cursor-pointer transition-all duration-200 hover:bg-[#60A5FA] hover:-translate-y-px hover:shadow-[0_6px_24px_rgba(61,142,232,0.4)] inline-block">Conoce al Equipo →</Link>
          </motion.div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="px-[5vw] py-[100px] relative overflow-hidden">
        <div className="absolute w-[600px] h-[400px] rounded-full blur-[100px] pointer-events-none bg-blue opacity-5 top-[-100px] left-[-100px]" />
        <div className="absolute w-[600px] h-[400px] rounded-full blur-[100px] pointer-events-none bg-yellow opacity-5 bottom-[-100px] right-[-100px]" />

        <div className="relative z-[1] grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-start">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 text-[0.72rem] font-bold tracking-[0.14em] uppercase text-blue mb-4 before:content-[''] before:block before:w-5 before:h-[1.5px] before:bg-blue">Contáctanos</div>
            <h2 className="text-[clamp(1.8rem,3vw,3rem)] font-black leading-[1.1] tracking-[-0.03em] mb-4">
              ¿Listo para construir<br />
              algo <span className="text-blue">juntos?</span>
            </h2>
            <p className="text-fg/55 text-base leading-[1.75] mb-8">
              Cuéntanos sobre tu proyecto. Responderemos en 24 horas con ideas frescas y un camino claro.
            </p>
            <ul className="list-none mt-7 flex flex-col gap-3.5 p-0">
              <li className="flex items-center gap-3 text-[0.9rem] text-fg/55"><span className="w-2 h-2 rounded-full shrink-0 bg-blue" /> Consultoría de estrategia gratuita</li>
              <li className="flex items-center gap-3 text-[0.9rem] text-fg/55"><span className="w-2 h-2 rounded-full shrink-0 bg-yellow" /> Planes a medida para MYPES</li>
              <li className="flex items-center gap-3 text-[0.9rem] text-fg/55"><span className="w-2 h-2 rounded-full shrink-0 bg-orange" /> Sin contratos forzosos a largo plazo</li>
              <li className="flex items-center gap-3 text-[0.9rem] text-fg/55"><span className="w-2 h-2 rounded-full shrink-0 bg-[#F0EFE8]" /> Precios transparentes desde el primer día</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[0.78rem] font-semibold text-fg/55 tracking-[0.04em]" htmlFor="fname">Nombre</label>
                  <input id="fname" name="fname" type="text" required placeholder="Ana"
                    className="bg-white/5 border border-white/5 rounded-[10px] text-fg font-inherit text-[0.9rem] p-3 transition-colors duration-200 outline-none w-full placeholder:text-fg/25 focus:border-blue focus:shadow-[0_0_0_3px_rgba(61,142,232,0.12)]" value={form.fname} onChange={handleChange}
                    disabled={submitting || submitted} />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[0.78rem] font-semibold text-fg/55 tracking-[0.04em]" htmlFor="lname">Apellido</label>
                  <input id="lname" name="lname" type="text" required placeholder="García"
                    className="bg-white/5 border border-white/5 rounded-[10px] text-fg font-inherit text-[0.9rem] p-3 transition-colors duration-200 outline-none w-full placeholder:text-fg/25 focus:border-blue focus:shadow-[0_0_0_3px_rgba(61,142,232,0.12)]" value={form.lname} onChange={handleChange}
                    disabled={submitting || submitted} />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[0.78rem] font-semibold text-fg/55 tracking-[0.04em]" htmlFor="email">Correo Electrónico</label>
                <input id="email" name="email" type="email" required placeholder="ana@tumarca.com"
                  className="bg-white/5 border border-white/5 rounded-[10px] text-fg font-inherit text-[0.9rem] p-3 transition-colors duration-200 outline-none w-full placeholder:text-fg/25 focus:border-blue focus:shadow-[0_0_0_3px_rgba(61,142,232,0.12)]" value={form.email} onChange={handleChange}
                  disabled={submitting || submitted} />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[0.78rem] font-semibold text-fg/55 tracking-[0.04em]" htmlFor="service">¿En qué te podemos ayudar?</label>
                <select id="service" name="service" className="bg-white/5 border border-white/5 rounded-[10px] text-fg font-inherit text-[0.9rem] p-3 transition-colors duration-200 outline-none w-full focus:border-blue focus:shadow-[0_0_0_3px_rgba(61,142,232,0.12)] appearance-none cursor-pointer [&>option]:bg-bg [&>option]:text-[#F0EFE8]"
                  value={form.service} onChange={handleChange} disabled={submitting || submitted}>
                  <option value="">Selecciona un servicio...</option>
                  <option>Estrategia de Marca</option>
                  <option>Diseño y Creatividad</option>
                  <option>Campañas Digitales</option>
                  <option>Tecnología y Desarrollo</option>
                  <option>Análisis de Datos</option>
                  <option>Todo — ¡Hablemos!</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[0.78rem] font-semibold text-fg/55 tracking-[0.04em]" htmlFor="message">Tu mensaje</label>
                <textarea id="message" name="message" required className="bg-white/5 border border-white/5 rounded-[10px] text-fg font-inherit text-[0.9rem] p-3 transition-colors duration-200 outline-none w-full placeholder:text-fg/25 focus:border-blue focus:shadow-[0_0_0_3px_rgba(61,142,232,0.12)] resize-y min-h-[110px]"
                  placeholder="Cuéntanos sobre tu proyecto, objetivos y tiempos..."
                  value={form.message} onChange={handleChange}
                  disabled={submitting || submitted} />
              </div>
              {!submitted ? (
                <button type="submit" className="w-full p-3.5 text-base rounded-[10px] text-center bg-yellow text-[#121212] border-none font-inherit font-extrabold cursor-pointer transition-all duration-200 hover:bg-[#fde047] hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(212,200,74,0.35)] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none" disabled={submitting}>
                  {submitting ? 'Enviando…' : 'Enviar Mensaje →'}
                </button>
              ) : (
                <div className="bg-[rgba(61,142,232,0.1)] border border-[rgba(61,142,232,0.25)] rounded-xl p-5 text-center text-blue font-semibold text-[0.95rem] animate-[fadeIn_0.3s_ease]">
                  ✦ ¡Mensaje recibido! Nos pondremos en contacto pronto.
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
