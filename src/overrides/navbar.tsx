'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMemo, useState } from 'react'
import { Menu, Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'
import { SITE_CONFIG } from '@/lib/site-config'
import { siteContent } from '@/config/site.content'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { cn } from '@/lib/utils'

export const NAVBAR_OVERRIDE_ENABLED = true

export function NavbarOverride() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const { isAuthenticated } = useAuth()
  const { recipe } = getFactoryState()

  const primaryTask = useMemo(
    () => SITE_CONFIG.tasks.find((t) => t.key === recipe.primaryTask && t.enabled),
    [recipe.primaryTask]
  )

  const navItems = useMemo(() => {
    const items: { label: string; href: string; emphasis: 'primary' | 'secondary' }[] = []
    if (primaryTask) {
      items.push({ label: primaryTask.label, href: primaryTask.route, emphasis: 'primary' })
    }
    items.push({ label: 'Pricing', href: '/pricing', emphasis: 'secondary' })
    items.push({ label: 'Contact', href: '/contact', emphasis: 'secondary' })
    return items
  }, [primaryTask])

  return (
    <header className="sticky top-0 z-50 border-b border-[color-mix(in_oklab,var(--nt-plum)_12%,transparent)] bg-[color-mix(in_oklab,white_88%,var(--nt-cream))] shadow-[0_1px_0_rgba(49,17,44,0.06)] backdrop-blur-xl">
      <div className="mx-auto flex h-[4.25rem] max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="group flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[var(--nt-plum)] text-sm font-bold tracking-tight text-[var(--nt-cream)] shadow-sm ring-2 ring-[color-mix(in_oklab,var(--nt-peach)_55%,transparent)] transition group-hover:ring-[var(--nt-peach)]">
            N
          </span>
          <span className="min-w-0">
            <span className="block truncate font-display text-lg font-semibold tracking-tight text-[var(--nt-plum)]">
              {SITE_CONFIG.name}
            </span>
            <span className="hidden text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground sm:block">
              {siteContent.navbar.tagline}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                  active
                    ? 'bg-[var(--nt-plum)] text-[var(--nt-cream)]'
                    : item.emphasis === 'primary'
                      ? 'text-[var(--nt-plum)] hover:bg-black/[0.04]'
                      : 'text-muted-foreground hover:text-[var(--nt-plum)]'
                )}
              >
                {item.label}
              </Link>
            )
          })}
          <Link
            href="/search"
            className="ml-1 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2 text-sm font-medium text-muted-foreground transition hover:border-primary/30 hover:text-foreground"
          >
            <Search className="h-4 w-4" aria-hidden />
            Search
          </Link>
        </nav>

        <div className="hidden items-center gap-2 sm:flex">
          {isAuthenticated ? (
            <Button variant="ghost" size="sm" className="rounded-full text-[var(--nt-plum)]" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          ) : (
            <>
              <Button variant="ghost" size="sm" className="rounded-full text-[var(--nt-plum)]" asChild>
                <Link href="/login">Log in</Link>
              </Button>
              <Button
                size="sm"
                className="rounded-full bg-[var(--nt-burgundy)] px-5 text-primary-foreground shadow-sm hover:bg-[color-mix(in_oklab,var(--nt-burgundy)_92%,black)]"
                asChild
              >
                <Link href="/register">Sign up</Link>
              </Button>
            </>
          )}
        </div>

        <button
          type="button"
          className="inline-flex rounded-full border border-border p-2 text-[var(--nt-plum)] lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-border bg-[color-mix(in_oklab,white_94%,var(--nt-cream))] px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-3 py-3 text-base font-semibold text-[var(--nt-plum)]"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/search" className="rounded-xl px-3 py-3 text-base font-semibold text-muted-foreground" onClick={() => setOpen(false)}>
              Search
            </Link>
            {!isAuthenticated ? (
              <div className="mt-2 flex flex-col gap-2 border-t border-border pt-3">
                <Link href="/login" className="rounded-xl px-3 py-2 text-sm font-medium" onClick={() => setOpen(false)}>
                  Log in
                </Link>
                <Link href="/register" className="rounded-xl px-3 py-2 text-sm font-semibold text-[var(--nt-burgundy)]" onClick={() => setOpen(false)}>
                  Sign up
                </Link>
              </div>
            ) : (
              <Link href="/dashboard" className="mt-2 rounded-xl px-3 py-2 text-sm font-medium" onClick={() => setOpen(false)}>
                Dashboard
              </Link>
            )}
          </div>
        </div>
      ) : null}
    </header>
  )
}
