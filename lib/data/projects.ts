export type Stat = { num: string; label: string; color: string }

export type Project = {
  id: number
  slug: string
  span: string
  hoverShadow: string
  tags: string[]
  bg: string
  hexStroke: string
  hexSize: number
  hexInner?: boolean
  thumbLabel: string
  tagColor: string
  tagLabels: string[]
  year: string
  title: string
  desc: string
  stats?: Stat[]
  delay: number
  large?: boolean
  image?: string
  gallery?: string[]
}

export const PROJECTS: Project[] = [
  {
    id: 1,
    slug: 'prince-fotografia',
    span: 'col-span-12 md:col-span-7',
    hoverShadow: 'hover:shadow-[0_20px_60px_rgba(61,142,232,0.18)]',
    tags: ['diseño', 'campaña'],
    bg: 'bg-[#181818]',
    hexStroke: '#3D8EE8',
    hexSize: 180,
    hexInner: true,
    thumbLabel: 'dirección de arte · concepto',
    tagColor: 'text-blue border-[rgba(61,142,232,0.3)] bg-[rgba(61,142,232,0.08)]',
    tagLabels: ['Diseño', 'Campaña'],
    year: '2026',
    title: 'Prince — Fotografía Conceptual',
    desc: 'Dirección de arte y serie fotográfica conceptual. Un enfoque audaz para redefinir la estética de la marca.',
    image: '/images/projects/prince/prince_4.jpg',
    gallery: [
      '/images/projects/prince/prince_1.jpg',
      '/images/projects/prince/prince_2.jpg',
      '/images/projects/prince/prince_3.jpg',
      '/images/projects/prince/prince_4.jpg'
    ],
    delay: 0,
    large: true,
  },
  {
    id: 2,
    slug: 'senor-anillos',
    span: 'col-span-12 md:col-span-5',
    hoverShadow: 'hover:shadow-[0_20px_60px_rgba(240,112,48,0.18)]',
    tags: ['diseño', 'digital'],
    bg: 'bg-[#181818]',
    hexStroke: '#F07030',
    hexSize: 140,
    thumbLabel: 'diseño visual · dirección',
    tagColor: 'text-orange border-[rgba(240,112,48,0.3)] bg-[rgba(240,112,48,0.08)]',
    tagLabels: ['Diseño', 'Digital'],
    year: '2026',
    title: 'El Señor de los Anillos',
    desc: 'Exploración visual y concepto gráfico inspirado en la mitología de Tolkien, fusionando arte tradicional con digital.',
    image: '/images/projects/senor_anillos/Señor_Anillos_3.jpg',
    gallery: [
      '/images/projects/senor_anillos/Señor_Anillos_1.jpg',
      '/images/projects/senor_anillos/Señor_Anillos_2.jpg',
      '/images/projects/senor_anillos/Señor_Anillos_3.jpg'
    ],
    delay: 0.08,
  },
  {
    id: 3,
    slug: 'independiente',
    span: 'col-span-12 md:col-span-8',
    hoverShadow: 'hover:shadow-[0_20px_60px_rgba(225,29,72,0.18)]',
    tags: ['marca', 'diseño'],
    bg: 'bg-[#181818]',
    hexStroke: '#E11D48',
    hexSize: 200,
    hexInner: true,
    thumbLabel: 'identidad de marca · diseño visual',
    tagColor: 'text-[#E11D48] border-[rgba(225,29,72,0.3)] bg-[rgba(225,29,72,0.08)]',
    tagLabels: ['Marca', 'Diseño'],
    year: '2026',
    title: 'Independiente — Identidad Visual',
    desc: 'Desarrollo de identidad y concepto de marca. Una aproximación fresca y moderna para destacar la fuerza creativa y visión del proyecto.',
    image: '/images/projects/independiente/Relleno_1.jpg.jpeg',
    gallery: [
      '/images/projects/independiente/Relleno_1.jpg.jpeg',
      '/images/projects/independiente/Relleno_2.jpg.jpeg',
      '/images/projects/independiente/Relleno_3.jpg.jpeg',
      '/images/projects/independiente/Relleno_4.jpg.jpeg',
      '/images/projects/independiente/Relleno_5.jpg.jpeg',
      '/images/projects/independiente/Relleno_6.jpg.jpeg'
    ],
    delay: 0.12,
    large: true,
  }
]