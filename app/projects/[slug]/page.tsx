import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Nav } from '@/components/layout/nav'
import { Footer } from '@/components/layout/footer'
import { PROJECTS } from '@/lib/data/projects'

// Generate static routes for all projects
export function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }))
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const project = PROJECTS.find((p) => p.slug === resolvedParams.slug)

  if (!project) {
    notFound()
  }

  // Get other projects for recommendation at the bottom
  const otherProjects = PROJECTS.filter((p) => p.id !== project.id).slice(0, 2)

  return (
    <div className="bg-bg text-fg min-h-screen overflow-x-hidden selection:bg-orange selection:text-white">
      <Nav />

      <main className="pt-[140px] pb-[100px]">
        <div className="px-[5vw] max-w-7xl mx-auto">
          {/* Back Navigation */}
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-fg/55 hover:text-orange transition-colors duration-200 mb-12 group"
          >
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="transition-transform group-hover:-translate-x-1"
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Volver a proyectos
          </Link>

          {/* Hero Section */}
          <header className="mb-16 md:mb-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-7">
              <div className="flex gap-2.5 items-center mb-6 flex-wrap">
                {project.tagLabels.map((label) => (
                  <span
                    key={label}
                    className={`text-[0.68rem] font-bold tracking-[0.08em] uppercase py-[3px] px-2.5 rounded-full border ${project.tagColor}`}
                  >
                    {label}
                  </span>
                ))}
                <span className="text-[0.8rem] text-fg/55 font-medium">{project.year}</span>
              </div>
              
              <h1 className="text-[clamp(2.4rem,4vw,4rem)] font-black leading-[1.05] tracking-[-0.03em] mb-6">
                {project.title}
              </h1>
              
              <p className="text-[clamp(1.1rem,1.5vw,1.3rem)] leading-[1.6] text-fg/70 max-w-[600px]">
                {project.desc}
              </p>
            </div>

            {project.stats && (
              <div className="lg:col-span-5 flex flex-col justify-end">
                <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-8 mt-8 lg:mt-0">
                  {project.stats.map((stat) => (
                    <div key={stat.label}>
                      <div className="text-[2rem] font-extrabold tracking-[-0.02em] mb-1" style={{ color: stat.color }}>
                        {stat.num}
                      </div>
                      <div className="text-[0.85rem] text-fg/55 font-medium uppercase tracking-[0.05em]">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </header>

          {/* Featured Image */}
          {project.image && (
            <div className="w-full relative rounded-3xl overflow-hidden mb-20 md:mb-32 aspect-video md:aspect-[21/9]">
              <Image 
                src={project.image} 
                alt={`${project.title} destacada`}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Mosaic Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <section className="mb-32">
              <h2 className="text-2xl font-bold tracking-[-0.02em] mb-10 border-b border-white/10 pb-4">
                Exploración Visual
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {project.gallery.map((imgSrc, index) => {
                  // Create a dynamic mosaic layout
                  // Make some items span 2 columns or 2 rows based on index
                  let spanClasses = "col-span-1 aspect-[4/3] md:aspect-square"
                  
                  if (index % 5 === 0) {
                    spanClasses = "md:col-span-2 lg:col-span-2 aspect-video"
                  } else if (index % 5 === 3 && project.gallery!.length > 4) {
                    spanClasses = "md:col-span-1 lg:col-span-2 aspect-[4/3] lg:aspect-video"
                  }
                  
                  return (
                    <div 
                      key={index} 
                      className={`relative overflow-hidden rounded-2xl bg-white/5 border border-white/5 group ${spanClasses}`}
                    >
                      <Image
                        src={imgSrc}
                        alt={`${project.title} galería ${index + 1}`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      {/* Simple hover overlay */}
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>
                  )
                })}
              </div>
            </section>
          )}

          {/* Other Projects */}
          {otherProjects.length > 0 && (
            <section className="mb-20 pt-20 border-t border-white/5">
              <h2 className="text-2xl font-bold tracking-[-0.02em] mb-10">
                Siguientes Proyectos
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {otherProjects.map((p) => (
                  <Link 
                    key={p.id}
                    href={`/projects/${p.slug}`}
                    className="group block"
                  >
                    <div className="relative aspect-video rounded-2xl overflow-hidden bg-white/5 border border-white/5 mb-4">
                      {p.image ? (
                        <Image 
                          src={p.image}
                          alt={p.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className={`w-full h-full flex items-center justify-center ${p.bg}`}>
                           <div className="text-[0.72rem] font-semibold font-mono tracking-[0.05em] text-[rgba(240,239,232,0.25)]">
                             {p.thumbLabel}
                           </div>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-bold group-hover:text-orange transition-colors">
                        {p.title}
                      </h3>
                      <svg 
                        width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-orange"
                      >
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

        </div>
      </main>

      <Footer />
    </div>
  )
}