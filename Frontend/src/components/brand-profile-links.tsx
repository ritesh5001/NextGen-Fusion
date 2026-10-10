import type { ComponentType, SVGProps } from "react"
import { Facebook, Globe, Instagram, Linkedin } from "lucide-react"
import { brandProfiles } from "@/data/offices"
import { cn } from "@/lib/utils"

// lucide only ships the old Twitter bird, so the X mark is inlined.
function XIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

const ICONS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  LinkedIn: Linkedin,
  Facebook,
  Instagram,
  X: XIcon,
}

const TONES = {
  light: "glass text-ink-soft hover:bg-white hover:text-ink",
  dark: "glass-ink text-white/80 hover:bg-white/15 hover:text-white",
}

/**
 * The official profiles from `brandProfiles`, so the footer, About and Contact
 * always list the same set as Organization.sameAs.
 */
export function BrandProfileLinks({
  tone = "light",
  className,
}: {
  tone?: keyof typeof TONES
  className?: string
}) {
  return (
    <ul className={cn("flex flex-wrap gap-3", className)}>
      {brandProfiles.map((profile) => {
        const Icon = ICONS[profile.label] ?? Globe
        return (
          <li key={profile.href}>
            <a
              href={profile.href}
              target="_blank"
              rel="me noopener noreferrer"
              className={cn(
                "soc-fill inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200",
                TONES[tone],
              )}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {profile.label}
            </a>
          </li>
        )
      })}
    </ul>
  )
}
