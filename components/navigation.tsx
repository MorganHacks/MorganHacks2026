"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { useState } from "react"
import { usePathname } from "next/navigation"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const links = [
    { href: "/tracks", label: "Track Cities" },
    // { href: "/timeline", label: "Timeline" },
    // { href: "/workshops", label: "Workshops" },
    // { href: "/transit", label: "Transit" },
    { href: "/sponsors", label: "Sponsors" },
  ]

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/")

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center neon-border group-hover:scale-110 transition-transform">
              <span className="text-lg font-bold text-background font-[family-name:var(--font-orbitron)]">M</span>
            </div>
            <span className="text-xl font-bold neon-glow-cyan font-[family-name:var(--font-orbitron)] group-hover:scale-105 transition-transform">
              MorganHacks
            </span>
            <span className="text-xs text-secondary ml-1 font-mono">2026</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors font-mono relative ${
                  isActive(link.href) ? "text-primary font-bold" : "text-muted-foreground hover:text-primary"
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            ))}
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 neon-border hover:scale-105 transition-transform">
              Register Now
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            aria-expanded={isOpen}
            aria-label="Toggle menu"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden absolute left-0 right-0 top-16 bg-background/95 border-t border-primary/20 shadow-xl animate-fade-in">
            <div className="flex flex-col gap-4 p-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm transition-colors font-mono ${
                    isActive(link.href) ? "text-primary font-bold" : "text-muted-foreground hover:text-primary"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 neon-border w-full">
                Register Now
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
