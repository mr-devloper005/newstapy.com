import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/site-config'
import { siteContent } from '@/config/site.content'
import { getFactoryState } from '@/design/factory/get-factory-state'

export const FOOTER_OVERRIDE_ENABLED = true

export function FooterOverride() {
  const { recipe } = getFactoryState()
  const primaryTask = SITE_CONFIG.tasks.find((t) => t.key === recipe.primaryTask && t.enabled)

  const columns = [
    {
      title: 'Product',
      links: [
        ...(primaryTask ? [{ label: primaryTask.label, href: primaryTask.route }] : []),
        { label: 'Pricing', href: '/pricing' },
        { label: 'Search', href: '/search' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' },
        { label: 'Press', href: '/press' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy', href: '/privacy' },
        { label: 'Terms', href: '/terms' },
        { label: 'Cookies', href: '/cookies' },
      ],
    },
  ]

  return (
    <footer className="border-t border-white/10 bg-[var(--nt-plum)] text-[color-mix(in_oklab,white_92%,var(--nt-cream))]">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.15fr_1fr_1fr_1fr]">
          <div>
            <p className="font-display text-xl font-semibold tracking-tight text-[var(--nt-cream)]">{SITE_CONFIG.name}</p>
            <p className="mt-2 text-sm leading-relaxed text-white/70">{siteContent.footer.tagline}</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">{SITE_CONFIG.description}</p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--nt-peach)]">{col.title}</p>
              <ul className="mt-4 space-y-2.5 text-sm">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-white/75 transition hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <p className="text-white/45">Built for distribution teams — not generic feeds.</p>
        </div>
      </div>
    </footer>
  )
}
