export type JobDepartment = "Engineering" | "Design" | "Marketing" | "Content"

export type JobType = "Full-time" | "Internship" | "Contract"

export interface JobOpening {
  id: string
  title: string
  department: JobDepartment
  location: string
  type: JobType
  experience: string
  summary: string
  responsibilities: string[]
  requirements: string[]
}

export const CAREERS_EMAIL = "contact@nextgenfusion.in"

export const jobDepartments: JobDepartment[] = [
  "Engineering",
  "Design",
  "Marketing",
  "Content",
]

export const jobOpenings: JobOpening[] = [
  {
    id: "full-stack-developer",
    title: "Full Stack Developer",
    department: "Engineering",
    location: "Lucknow / Remote",
    type: "Full-time",
    experience: "1-3 years",
    summary:
      "Build production web applications end to end — Next.js and React on the front, Node and Postgres behind it — for clients across e-commerce, education, and B2B.",
    responsibilities: [
      "Ship features across the stack, from database schema to shipped UI",
      "Design REST APIs and data models that survive changing requirements",
      "Own deployments and keep production healthy after launch",
      "Review teammates' code and keep the codebase consistent",
    ],
    requirements: [
      "Strong JavaScript and TypeScript fundamentals",
      "Real project experience with React or Next.js",
      "Comfortable with Node.js, Express, and a SQL or NoSQL database",
      "Git, and the judgement to know what belongs in one commit",
    ],
  },
  {
    id: "wordpress-woocommerce-developer",
    title: "WordPress & WooCommerce Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    experience: "1-4 years",
    summary:
      "Own the store builds. We run a large fleet of live WooCommerce sites, and this role takes them from empty install to a catalogue that sells.",
    responsibilities: [
      "Build and launch WooCommerce stores end to end",
      "Configure payments, shipping, and tax so the first order works",
      "Tune site speed, caching, and Core Web Vitals",
      "Maintain and improve live client sites without breaking them",
    ],
    requirements: [
      "Hands-on WooCommerce and WordPress theme experience",
      "Working PHP, HTML, and CSS",
      "Familiarity with page builders such as Elementor",
      "Care about performance and clean, handover-ready setups",
    ],
  },
  {
    id: "react-native-developer",
    title: "React Native Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    experience: "1-3 years",
    summary:
      "Build mobile apps that share a backend with our web products — commerce, dashboards, and internal tools on iOS and Android.",
    responsibilities: [
      "Build and ship React Native apps with Expo",
      "Integrate REST APIs, auth, and payments",
      "Take builds through the App Store and Play Store review process",
      "Profile and fix performance problems on real devices",
    ],
    requirements: [
      "React Native experience with at least one shipped app",
      "Solid React and TypeScript",
      "Understanding of mobile navigation and state management",
      "Bonus: native Android or iOS familiarity",
    ],
  },
  {
    id: "ui-ux-designer",
    title: "UI/UX Designer",
    department: "Design",
    location: "Lucknow / Remote",
    type: "Full-time",
    experience: "1-3 years",
    summary:
      "Design the interfaces our developers build. Websites, storefronts, and dashboards that look considered and hold up once real content lands in them.",
    responsibilities: [
      "Design responsive web and mobile interfaces in Figma",
      "Build and maintain reusable component libraries",
      "Work directly with developers through implementation",
      "Turn client feedback into design decisions you can defend",
    ],
    requirements: [
      "A portfolio of web or app work you can walk us through",
      "Fluent in Figma, including components and auto layout",
      "Understanding of responsive layout and accessibility basics",
      "Bonus: enough HTML and CSS to know what is cheap to build",
    ],
  },
  {
    id: "seo-executive",
    title: "SEO Executive",
    department: "Marketing",
    location: "Lucknow",
    type: "Full-time",
    experience: "1-3 years",
    summary:
      "Own organic growth for our clients — technical fixes, content strategy, and the reporting that shows what actually moved.",
    responsibilities: [
      "Run technical audits and fix what they surface",
      "Do keyword research and shape content plans around it",
      "Build and monitor on-page SEO across client sites",
      "Report rankings, traffic, and conversions to clients monthly",
    ],
    requirements: [
      "Hands-on SEO experience with results you can point to",
      "Google Analytics and Search Console",
      "Familiarity with Ahrefs, SEMrush, or Rank Math",
      "Clear written English for client-facing reports",
    ],
  },
  {
    id: "performance-marketing-executive",
    title: "Performance Marketing Executive",
    department: "Marketing",
    location: "Mumbai / Remote",
    type: "Full-time",
    experience: "1-3 years",
    summary:
      "Run paid campaigns across Google and Meta for e-commerce and lead-generation clients, and be accountable for the number at the end.",
    responsibilities: [
      "Plan, launch, and optimise Google and Meta ad campaigns",
      "Manage budgets against agreed ROAS and CPL targets",
      "Set up conversion tracking properly, before spend starts",
      "Test creative and landing pages, and act on what wins",
    ],
    requirements: [
      "Experience running paid campaigns with real budget",
      "Google Ads and Meta Ads Manager",
      "Comfortable with conversion tracking and pixel setup",
      "Analytical, and honest about what is not working",
    ],
  },
  {
    id: "content-social-media-executive",
    title: "Content & Social Media Executive",
    department: "Content",
    location: "Lucknow",
    type: "Full-time",
    experience: "0-2 years",
    summary:
      "Write the words and run the feeds — for our clients and for us. Blogs, landing copy, and the social calendar that keeps both moving.",
    responsibilities: [
      "Write blog posts, landing page copy, and case studies",
      "Plan and schedule social content across client accounts",
      "Coordinate with design on creatives and with SEO on keywords",
      "Track engagement and adjust the plan around it",
    ],
    requirements: [
      "Genuinely strong written English",
      "Some content or social media experience, including personal projects",
      "Understanding of how each platform actually differs",
      "Bonus: basic Canva or video editing",
    ],
  },
  {
    id: "web-development-intern",
    title: "Web Development Intern",
    department: "Engineering",
    location: "Lucknow",
    type: "Internship",
    experience: "Student or fresher",
    summary:
      "A six-month paid internship on real client projects. You will not be fetching coffee or building throwaway demos — your code goes live.",
    responsibilities: [
      "Build features on live client websites with a mentor reviewing",
      "Fix bugs and take on small, well-scoped tasks end to end",
      "Learn our stack, our Git workflow, and how we deploy",
      "Join client calls and see how requirements actually arrive",
    ],
    requirements: [
      "Working HTML, CSS, and JavaScript",
      "Some exposure to React, or clear eagerness to learn it",
      "Projects you built yourself, however small",
      "Available in Lucknow for at least six months",
    ],
  },
]

/** Prefilled application email so a candidate never faces an empty compose window. */
export function applyMailto(job: JobOpening): string {
  const subject = `Application: ${job.title} (${job.location})`
  const body = [
    `Hi NextGen Fusion team,`,
    ``,
    `I would like to apply for the ${job.title} role.`,
    ``,
    `Name:`,
    `Phone:`,
    `Current location:`,
    `Years of experience:`,
    `Portfolio / GitHub / LinkedIn:`,
    ``,
    `Why I am a good fit:`,
    ``,
    ``,
    `I have attached my resume.`,
    ``,
    `Thank you,`,
  ].join("\n")

  return `mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

/** Open application for candidates who do not match a listed role. */
export function openApplicationMailto(): string {
  const subject = "Open application - NextGen Fusion"
  const body = [
    `Hi NextGen Fusion team,`,
    ``,
    `I do not see a role that matches me exactly, but I would like to be considered.`,
    ``,
    `Name:`,
    `Phone:`,
    `Current location:`,
    `What I do:`,
    `Portfolio / GitHub / LinkedIn:`,
    ``,
    `I have attached my resume.`,
    ``,
    `Thank you,`,
  ].join("\n")

  return `mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
