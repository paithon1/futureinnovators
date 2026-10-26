import { images } from "./images";

export const org = {
  name: "The Future Innovators",
  shortName: "The Future Innovators",
  legalName: "The Future Innovators Corp.",
  phone: "+1 (770) 370-9322",
  phoneHref: "tel:+17703709322",
  email: "thefutureinnovators25@gmail.com",
  youtube: "https://www.youtube.com/@thefutureinnovators_rpai",
  youtubeHandle: "@thefutureinnovators_rpai",
  location: "Atlanta, Georgia, USA",
  foundedNote: "Student-founded nonprofit",
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export const stats = [
  { value: "120+", label: "Students enrolled" },
  { value: "5", label: "Schools served" },
  { value: "100%", label: "Increase in STEM interest" },
];

export const workshops = [
  {
    title: "Circuitry",
    body: "Students learn how electricity actually moves — then use that knowledge to build, test, and troubleshoot simple circuits in a lively classroom setting.",
    icon: "circuit" as const,
  },
  {
    title: "Materials Science",
    body: "Workshops ask students to prototype solutions to real engineering problems, then evaluate which materials and designs hold up.",
    icon: "materials" as const,
  },
  {
    title: "Programming and AI",
    body: "Core coding ideas and algorithmic thinking, applied to authentic challenges — from software basics to how AI is already shaping industry.",
    icon: "code" as const,
  },
  {
    title: "Arduinos",
    body: "Electronics, embedded systems, and C/C++ come together as students wire hardware, write code, and see a complete system come alive.",
    icon: "chip" as const,
  },
];

export const math2026Gallery = [
  { src: images.math2026_2, alt: "Live online math class with students in Telangana" },
  { src: images.math2026_3, alt: "Ratios and proportions lesson on screen" },
  { src: images.math2026_1, alt: "Grades 6 and 7 following an online math session" },
];

export const indiaGallery = [
  { src: images.img4570, alt: "AI workshop lecture in rural Telangana" },
  { src: images.img4571, alt: "Students in uniform attending the India session" },
  { src: images.img4568, alt: "Founder presenting AI algorithms" },
  { src: images.img4580, alt: "Nachiketa Vidya Mandir campus" },
  { src: images.indiaWorkshop, alt: "Community welcome in Jadcherla" },
];

export const atlantaGallery = [
  { src: images.workshop2, alt: "Students building circuits at tables" },
  { src: images.workshop5, alt: "C++ and Arduino lecture in Atlanta" },
  { src: images.workshop6, alt: "Simple LED circuit workshop" },
  { src: images.atlanta1, alt: "Mentorship during a Sunday session" },
  { src: images.atlanta2, alt: "Short circuits lesson at the library" },
  { src: images.workshop4, alt: "Arduino, breadboard, and LED project" },
];

export const projects = [
  {
    id: "india-math-2026",
    region: "Rural Telangana, India",
    place: "Jadcherla · online classroom",
    season: "Summer–Fall 2026",
    students: "60 students",
    summary:
      "A live online math program for 60 sixth and seventh graders at Nachiketa Vidya Mandir, covering the fundamental topics they meet in school.",
    location: "Online, with Nachiketa Vidya Mandir, Kodgal, Jadcherla, Telangana, India",
    cover: images.math2026_2,
    gallery: math2026Gallery,
    paragraphs: [
      "After the winter AI workshops, we stayed with Nachiketa Vidya Mandir — this time over video, so the partnership could continue through summer and fall without another travel-heavy visit. Students gather in their hall in rural Telangana; the lesson is taught live from Atlanta.",
      "The 2026 program is built for 60 students in grades 6 and 7. Sessions walk through the core ideas already in their school math: number sense, factors and multiples, fractions, ratios, and proportional reasoning. The goal is not a side enrichment track. It is to make the fundamentals clearer so students can keep up in class and go further when they are ready.",
      "Teaching online into a village classroom is a different kind of workshop. Students sit together, follow the screen, ask questions, and work problems in real time. The aim matches our in-person work: keep the room interactive, make foundational ideas stick, and give younger students a steadier start in STEM.",
    ],
  },
  {
    id: "india",
    region: "Rural Telangana, India",
    place: "Jadcherla area villages",
    season: "Winter 2025",
    students: "50+ students",
    summary:
      "An AI-focused winter workshop with Nachiketa Vidya Mandir, serving students from surrounding villages in southern Telangana.",
    location: "Nachiketa Vidya Mandir, Kodgal, Jadcherla, Telangana, India",
    cover: images.img4570,
    gallery: indiaGallery,
    paragraphs: [
      "The Future Innovators partnered with Nachiketa Vidya Mandir, a rural school serving students from Nursery through 10th grade in the Kodgal-Jadcherla region. The school draws its entire student population from nearby villages and has grown to 365 students as of December 2025.",
      "In winter 2025 we worked with about 50 students in grades 8–10. Sessions introduced the fundamentals of artificial intelligence and how it is already changing engineering, healthcare, transportation, education, and research.",
      "Students arrived as beginners and quickly grew confident discussing AI ideas — including why early exposure matters as India introduces AI-focused curricula. The partnership does not end with this workshop; we are committed to a longer relationship with the school.",
    ],
  },
  {
    id: "atlanta",
    region: "Northeast Atlanta, United States",
    place: "North Fulton / North Gwinnett",
    season: "Summer 2025",
    students: "26 students",
    summary:
      "Weekly Sunday workshops for middle-school students from Johns Creek and Alpharetta, hosted at the Duluth library.",
    location: "Gwinnett County Public Library (Duluth Branch), 3180 Main St, Duluth, Georgia 30096",
    cover: images.workshop5,
    gallery: atlantaGallery,
    paragraphs: [
      "Our Northern Atlanta initiative enrolled 26 students from River Trail, Webb Bridge, and Taylor Road middle schools, plus Shakerag Elementary. Weekly Sunday workshops began June 1 and built a collaborative room where questions were expected.",
      "Rather than teaching circuitry, robotics, materials science, and programming in isolation, students connected those ideas through Arduino projects — ideating, building, and refining solutions to real problems.",
      "Most students started as beginners. By the end of the summer, every participant had stronger technical skills, more confidence, and a clearer sense of themselves as engineers.",
    ],
  },
];
