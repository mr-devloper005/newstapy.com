import type { Metadata } from 'next'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/pricing',
    title: `Plans & pricing | ${SITE_CONFIG.name}`,
    description: 'Compare NewsTapy distribution tiers, add-ons, and included analytics.',
    openGraphTitle: `Plans & pricing | ${SITE_CONFIG.name}`,
    openGraphDescription: 'Three clear tiers with transparent feature comparison for press distribution.',
    image: SITE_CONFIG.defaultOgImage,
    keywords: ['pricing', 'press distribution', 'NewsTapy plans'],
  })
}

const plans = [
  {
    name: 'Basic',
    price: '$199',
    cadence: 'per release',
    blurb: 'Essential reach for routine announcements.',
    features: ['Regional distribution', 'Standard analytics', 'Email support'],
    cta: 'Start Basic',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '$399',
    cadence: 'per release',
    blurb: 'Balanced visibility with stronger placement.',
    features: ['National distribution tier', 'Engagement analytics', 'Priority review window', 'Media contact block'],
    cta: 'Choose Pro',
    highlight: true,
  },
  {
    name: 'Premium',
    price: '$749',
    cadence: 'per release',
    blurb: 'Maximum reach with hands-on editorial support.',
    features: ['Premium syndication bundle', 'Advanced performance dashboards', 'Dedicated strategist', 'Crisis/embargo workflows'],
    cta: 'Talk to sales',
    highlight: false,
  },
]

const comparison = [
  { label: 'Distribution level', basic: 'Regional', pro: 'National', premium: 'National + premium partners' },
  { label: 'Analytics depth', basic: 'Standard', pro: 'Engagement + referrals', premium: 'Full funnel + exports' },
  { label: 'Media reach', basic: 'Core network', pro: 'Expanded verticals', premium: 'Maximum priority routing' },
]

const addOns = [
  { title: 'Extra geography pack', detail: 'Add a focused region or language bundle to any tier.' },
  { title: 'Embargo & coordination', detail: 'Synchronized publishing windows across partner channels.' },
  { title: 'Creative asset polish', detail: 'Optional formatting pass for headlines, decks, and pull quotes.' },
]

const faqs = [
  {
    q: 'Do plans include writing or editing?',
    a: 'Tiers cover distribution and measurement. Writing assistance is available as an add-on where listed.',
  },
  {
    q: 'Can we change plans between releases?',
    a: 'Yes. Pick the tier that matches each announcement—there are no long-term lock-ins on this page.',
  },
  {
    q: 'What analytics are included?',
    a: 'All plans include baseline pickup and engagement signals. Higher tiers add deeper referral and funnel views.',
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <NavbarShell />
      <main>
        <section className="border-b border-border bg-[var(--nt-plum)] py-16 text-[var(--nt-cream)]">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[var(--nt-peach)]">Pricing</p>
            <h1 className="mt-4 max-w-2xl font-display text-4xl font-semibold tracking-tight sm:text-5xl">Choose a distribution tier</h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/75">
              Compare what is included at each level. Exact billing is handled in your account workspace—this page is a transparent
              reference for stakeholders.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative flex flex-col rounded-3xl border p-7 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
                  plan.highlight
                    ? 'border-[var(--nt-burgundy)] bg-[color-mix(in_oklab,white_88%,var(--nt-cream))] ring-2 ring-[color-mix(in_oklab,var(--nt-burgundy)_35%,transparent)]'
                    : 'border-border bg-card'
                }`}
              >
                {plan.highlight ? (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[var(--nt-peach)] px-4 py-1 text-[11px] font-bold uppercase tracking-wider text-[var(--nt-plum)]">
                    Popular
                  </span>
                ) : null}
                <h2 className="font-display text-xl font-semibold text-[var(--nt-plum)]">{plan.name}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{plan.blurb}</p>
                <p className="mt-6 font-display text-4xl font-semibold text-[var(--nt-plum)]">
                  {plan.price}
                  <span className="ml-2 text-base font-normal text-muted-foreground">{plan.cadence}</span>
                </p>
                <ul className="mt-6 flex-1 space-y-3 text-sm text-muted-foreground">
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--nt-burgundy)]" aria-hidden />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`mt-8 inline-flex items-center justify-center rounded-xl py-3 text-center text-sm font-semibold transition ${
                    plan.highlight
                      ? 'bg-[var(--nt-burgundy)] text-white hover:bg-[color-mix(in_oklab,var(--nt-burgundy)_90%,black)]'
                      : 'border border-border bg-background hover:bg-muted'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="border-y border-border bg-[color-mix(in_oklab,white_75%,var(--nt-cream))] py-14">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="font-display text-2xl font-semibold text-[var(--nt-plum)]">Feature comparison</h2>
            <p className="mt-2 text-sm text-muted-foreground">Core differences across distribution, analytics, and reach.</p>
            <div className="mt-8 overflow-x-auto rounded-2xl border border-border bg-card">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="px-4 py-3 font-semibold text-[var(--nt-plum)]">Capability</th>
                    <th className="px-4 py-3 font-semibold">Basic</th>
                    <th className="px-4 py-3 font-semibold">Pro</th>
                    <th className="px-4 py-3 font-semibold">Premium</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row) => (
                    <tr key={row.label} className="border-b border-border last:border-0">
                      <td className="px-4 py-4 font-medium text-foreground">{row.label}</td>
                      <td className="px-4 py-4 text-muted-foreground">{row.basic}</td>
                      <td className="px-4 py-4 text-muted-foreground">{row.pro}</td>
                      <td className="px-4 py-4 text-muted-foreground">{row.premium}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="font-display text-2xl font-semibold text-[var(--nt-plum)]">Add-ons</h2>
          <p className="mt-2 text-sm text-muted-foreground">Extend any tier when a release needs extra coordination.</p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {addOns.map((item) => (
              <div key={item.title} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <h3 className="font-semibold text-[var(--nt-plum)]">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-border bg-card py-14">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <h2 className="text-center font-display text-2xl font-semibold text-[var(--nt-plum)]">FAQ</h2>
            <dl className="mt-10 space-y-6">
              {faqs.map((item) => (
                <div key={item.q} className="rounded-2xl border border-border bg-background p-6">
                  <dt className="font-semibold text-[var(--nt-plum)]">{item.q}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.a}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-10 text-center text-sm text-muted-foreground">
              Questions about enterprise volume?{' '}
              <Link href="/contact" className="font-semibold text-[var(--nt-burgundy)] hover:underline">
                Contact the team
              </Link>
              .
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
