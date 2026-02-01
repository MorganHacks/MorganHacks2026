"use client"

import type { SVGProps } from "react"
import Link from "next/link"
import { Mail } from "lucide-react"

// Minimal Font Awesome brand icons (inline SVGs) for TikTok, Instagram, and LinkedIn
const TikTok = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 448 512" aria-hidden="true" focusable="false" {...props}>
    <path
      fill="currentColor"
      d="M448 209.9c-52.4-.6-94.9-17.2-130.6-50.3v163.1c0 87.8-70.7 158.4-158.5 158.4C71.6 481.1 0 410.5 0 322.6c0-87.9 70.6-158.4 158.5-158.4 7.1 0 14.3.5 21.2 1.6V245c-7-2.3-14.2-3.5-21.5-3.5-39 0-70.7 31.8-70.7 71.1 0 39.2 31.7 71 70.7 71 39.1 0 70.8-31.8 70.8-71V0l85.9.1c3.7 63.9 44.7 111.2 109.6 114.7v95.1z"
    />
  </svg>
)

const Instagram = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 448 512" aria-hidden="true" focusable="false" {...props}>
    <path
      fill="currentColor"
      d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9S160.5 370.8 224.1 370.8 339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12.1 27-27 27-14.9 0-27-12.1-27-27 0-14.9 12.1-27 27-27 15 0 27 12.1 27 27zm76.1 27.2c-.1-35.2-9.6-66.5-34.9-91.9C386.3 46.3 355 36.7 319.8 36.6c-36.2-2.1-144.8-2.1-181 0-35.2.1-66.5 9.6-91.9 34.9C21.6 96.9 12.1 128.2 12 163.4c-2.1 36.2-2.1 144.8 0 181 0 35.2 9.6 66.5 34.9 91.9 25.4 25.3 56.7 34.9 91.9 34.9 36.2 2.1 144.8 2.1 181 0 35.2-.1 66.5-9.6 91.9-34.9 25.4-25.4 34.9-56.7 34.9-91.9 2.1-36.2 2.1-144.7 0-181zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.4 9s-102.9 2.6-132.4-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.4s-2.6-102.9 9-132.4c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.4-9s102.9-2.6 132.4 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.4s2.7 102.9-9 132.4z"
    />
  </svg>
)

const Linkedin = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 448 512" aria-hidden="true" focusable="false" {...props}>
    <path
      fill="currentColor"
      d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.5A53.79 53.79 0 0 1 107.58 53c0 30-24.09 55.1-53.79 55.1zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.27-79.2-48.3 0-55.7 37.7-55.7 76.7V448H158.5V148.9h89V188h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z"
    />
  </svg>
)

const socials = [
  { label: "Email", href: "mailto:morganhacks2022@gmail.com", icon: Mail },
  { label: "Instagram", href: "https://www.instagram.com/morgan.hacks", icon: Instagram },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/morganhacks", icon: Linkedin },
  { label: "TikTok", href: "https://www.tiktok.com/@morganhacks2026", icon: TikTok },
]

const involvementLinks = [
  { label: "Hacker Registration", href: "https://www.jotform.com/form/251163649282157" },
  { label: "Mentor Registration", href: "https://www.jotform.com/form/253297815473164" },
  { label: "Sponsor Interest Form", href: "https://www.jotform.com/form/253334594024051" },
  { label: "Judge Registration", href: "https://www.jotform.com/form/253384910720152" },
  { label: "Volunteer", href: "https://www.jotform.com/form/253384481261155" },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-primary/20 bg-card/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-3 items-start">
          <div className="space-y-2">
            <p className="text-lg font-bold font-orbitron">MorganHacks</p>
            <p className="text-sm text-muted-foreground">
              Morgan State University&apos;s hackathon for builders across all majors. Join us in April to ship bold ideas.
            </p>
          </div>
          <div>
            <p className="text-sm font-bold mb-2 font-orbitron">Stay Connected</p>
            <div className="flex flex-wrap gap-4">
              {socials.map((social) => {
                const Icon = social.icon
                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-primary/20 text-sm text-foreground hover:border-primary/50 transition-colors"
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    <Icon className="w-4 h-4" />
                    {social.label}
                  </Link>
                )
              })}
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-bold font-orbitron">Get Involved</p>
            <div className="grid grid-cols-1 gap-2">
              {involvementLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="inline-flex items-center justify-between px-3 py-2 rounded-md border border-primary/20 text-sm text-foreground hover:border-primary/50 transition-colors"
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  <span>{link.label}</span>
                  <span className="text-xs text-muted-foreground font-mono">→</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 text-sm text-muted-foreground text-center space-y-2">
          <p>
            <Link 
              href="https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors underline underline-offset-2"
            >
              MLH Code of Conduct
            </Link>
          </p>
          <p>© 2025 MorganHacks. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
