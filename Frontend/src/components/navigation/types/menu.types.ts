import { Edit, Users, Github, Figma, Triangle, Zap, Package, HelpCircle, ExternalLink, LucideIcon } from "lucide-react"

export interface MenuItem {
  id?: string
  label: string
  callout?: string
  icon?: keyof typeof iconMap
  IconComponent?: LucideIcon
  badge?: string
  isImage?: boolean
  spanColumns?: boolean
  isRightPanel?: boolean
  url?: string
  target?: string
}

export interface MenuList {
  label?: string
  badge?: string
  list: MenuItem[]
}

export interface MenuChannel {
  label: string
  id: string
  badge?: string
  lists: MenuList[]
}

export const iconMap = {
  "edit-alt": Edit,
  "maas-robot": Users,
  "brand-github": Github,
  "brand-figma": Figma,
  "brand-vue": Triangle,
  "brand-nuxt": Zap,
  "maas-mr": Package,
  "maas-dt": Package,
  "maas-az": Package,
  "maas-ve": Package,
  "maas-of": Package,
  "help-circle": HelpCircle,
  "external-link": ExternalLink,
} as const

export const menuData: MenuChannel[] = [
  {
    label: "About Us",
    id: "about-channel",
    lists: [
      {
        label: "Company",
        list: [
          {
            label: "Who We Are",
            callout: "Get to know our team",
            icon: "maas-robot",
          },
          {
            label: "Our Values",
            callout: "What drives us forward",
            icon: "edit-alt",
          },
          {
            label: "FAQ",
            callout: "Frequently asked questions",
            icon: "help-circle",
          },
        ],
      },
      {
        list: [
          {
            label: "Our Blog",
            callout: "Insights and updates",
            icon: "edit-alt",
            url: "/blog",
            target: "_self",
            isImage: true,
            isRightPanel: true
          }
        ]
      },
    ],
  },
  {
    label: "Services",
    id: "services-channel",
    lists: [
      {
        label: "Web & Design",
        list: [
          { label: "Website Development", callout: "High-performance, SEO-ready sites", icon: "brand-vue", url: "/services/website-development-services", target: "_self" },
          { label: "E-commerce Development", callout: "Stores that convert and scale", icon: "brand-nuxt", url: "/services/ecommerce-web-development-services", target: "_self" },
          { label: "Web Design", callout: "Conversion-focused UI/UX design", icon: "maas-dt", url: "/services/web-design-services", target: "_self" },
          { label: "Android App Development", callout: "Native Kotlin apps for growth", icon: "brand-vue", url: "/services/android-app-development-services", target: "_self" },
        ],
      },
      {
        label: "Marketing & Growth",
        list: [
          { label: "SEO Services", callout: "Compounding organic traffic growth", icon: "external-link", url: "/services/seo-services", target: "_self" },
          { label: "PPC Services", callout: "ROI-focused paid campaigns", icon: "maas-az", url: "/services/ppc-services", target: "_self" },
          { label: "Social Media Marketing", callout: "Brand authority that converts", icon: "edit-alt", url: "/services/social-media-marketing-services", target: "_self" },
        ],
      },
      {
        label: "Technology",
        list: [
          { label: "AI Automation & Development", callout: "LLM integration & workflow automation", icon: "brand-figma", url: "/services/ai-automation-development-services", target: "_self" },
          { label: "Software Development", callout: "Custom software for your workflow", icon: "maas-mr", url: "/services/software-development-services", target: "_self" },
          { label: "API Integration", callout: "Connect all your tools seamlessly", icon: "maas-ve", url: "/services/api-integration-services", target: "_self" },
          { label: "Cloud Solutions", callout: "Scalable, cost-optimised infrastructure", icon: "maas-robot", url: "/services/cloud-solutions", target: "_self" },
          { label: "Website Maintenance", callout: "Keep your site secure & fast", icon: "help-circle", url: "/services/website-maintenance-services", target: "_self" },
        ],
      },
    ],
  },
  {
    label: "Product",
    id: "product-channel",
    lists: [
      {
        label: "Development",
        list: [
          {
            label: "Web Development",
            callout: "Make your website",
            icon: "brand-vue",
          },
          {
            label: "Mobile Development",
            callout: "Make your mobile app",
            icon: "brand-nuxt",
          },
        ],
      },
      {
        label: "Data Driven",
        list: [
          {
            label: "Data and BI Analyst",
            callout: "Handle your data",
            icon: "brand-github",
          },
          {
            label: "Data Scientist",
            callout: "Machine learning, SQL etc",
            icon: "brand-figma",
          },
        ],
      },
      {
        label: "Design",
        list: [
          {
            label: "UI UX",
            callout: "User-friendly interfaces",
            icon: "maas-dt",
          },
          {
            label: "Graphic Design",
            callout: "Craft visuals",
            icon: "maas-az",
          },
        ],
      },
      {
        list: [
          {
            label: "Our Education Programs",
            callout: "Explore our learning paths and boost your career",
            icon: "edit-alt",
            isImage: true,
            isRightPanel: true
          }
        ]
      },
    ],
  },
  {
    label: "Resource",
    id: "resource-channel",
    lists: [
      {
        label: "Assets",
        list: [
          {
            label: "GitHub",
            badge: "Soon",
            callout: "What we code",
            icon: "brand-github",
          },
          {
            label: "Figma",
            badge: "Soon",
            callout: "Our design",
            icon: "brand-figma",
          },
        ],
      },
      {
        label: "Our Work",
        list: [
          {
            label: "Portfolio",
            callout: "See our latest projects",
            icon: "maas-mr",
            url: "/portofolio",
            target: "_self",
          },
          {
            label: "Showcase",
            callout: "Explore our creative work",
            icon: "maas-ve",
            url: "/showcase",
            target: "_self",
          },
          {
            label: "Case Studies",
            callout: "In-depth project breakdowns",
            icon: "maas-ve",
          },
        ],
      },
    ],
  },
  {
    label: "Contact",
    id: "contact-channel",
    lists: [],
  },
]
