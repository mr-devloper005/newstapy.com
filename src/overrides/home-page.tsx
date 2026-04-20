import Link from 'next/link'
import { ArrowRight, CheckCircle2, Radio, Shield, Sparkles } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { fetchTaskPosts } from '@/lib/task-data'
import { SITE_CONFIG } from '@/lib/site-config'
import { siteContent } from '@/config/site.content'
import { buildPostUrl, getPostImages } from '@/lib/task-data'
import type { SitePost } from '@/lib/site-connector'

export const HOME_PAGE_OVERRIDE_ENABLED = true

function excerpt(text?: string | null, max = 120) {
  const value = (text || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
  if (!value) return ''
  return value.length > max ? `${value.slice(0, max - 1).trim()}…` : value
}

function categoryLabel(post: SitePost) {
  const c = post.content && typeof post.content === 'object' ? (post.content as { category?: string }).category : undefined
  if (typeof c === 'string' && c.trim()) return c.trim()
  const tag = post.tags?.find((t) => typeof t === 'string')
  return typeof tag === 'string' ? tag : 'Release'
}

export async function HomePageOverride() {
  const posts = await fetchTaskPosts('mediaDistribution', 12, { allowMockFallback: false, fresh: true })
  const lead = posts[0]
  const grid = posts.slice(0, 8)

  const schemaData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.baseUrl,
      logo: `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}${SITE_CONFIG.defaultOgImage}`,
      sameAs: [],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.baseUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavbarShell />
      <SchemaJsonLd data={schemaData} />

      <section className="relative overflow-hidden border-b border-[color-mix(in_oklab,var(--nt-plum)_18%,transparent)] bg-[var(--nt-plum)] text-[var(--nt-cream)]">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.22]"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 20%, rgba(242,160,123,0.35), transparent 42%),
              radial-gradient(circle at 80% 0%, rgba(125,6,51,0.55), transparent 45%),
              url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cpath fill='none' stroke='rgba(251,220,196,0.08)' stroke-width='1' d='M0 60h120M60 0v120'/%3E%3C/svg%3E")`,
          }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12 lg:pb-24 lg:pt-20">
          <div className="max-w-xl">
            <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--nt-peach)]">
              <span className="h-px w-8 bg-[var(--nt-peach)]" aria-hidden />
              {siteContent.hero.badge}
            </p>
            <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
              Distribution that reads like a wire — not a blog theme.
            </h1>
            <p className="mt-5 text-base leading-relaxed text-white/78">{SITE_CONFIG.description}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href={siteContent.hero.primaryCta.href}
                className="inline-flex items-center gap-2 rounded-full bg-[var(--nt-burgundy)] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-black/20 transition hover:bg-[color-mix(in_oklab,var(--nt-burgundy)_90%,black)]"
              >
                {siteContent.hero.primaryCta.label}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                href={siteContent.hero.secondaryCta.href}
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
              >
                {siteContent.hero.secondaryCta.label}
              </Link>
            </div>
            <ul className="mt-10 grid gap-3 text-sm text-white/80 sm:grid-cols-2">
              {['Structured release pages', 'Archive filters & search', 'Share-ready detail views'].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--nt-peach)]" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative mt-12 lg:mt-0">
            <div className="relative rounded-[2rem] border border-white/12 bg-[color-mix(in_oklab,var(--nt-plum)_82%,white)] p-6 shadow-[0_40px_100px_rgba(0,0,0,0.35)] backdrop-blur-md">
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--nt-cream)]/10 text-[var(--nt-peach)] ring-1 ring-white/10">
                    <Radio className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/55">Live desk</p>
                    <p className="text-sm font-semibold text-white">Release pipeline</p>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-emerald-200">Online</span>
              </div>
              <div className="mt-5 space-y-4">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-2xl border border-white/8 bg-black/15 px-4 py-3 transition hover:border-[var(--nt-peach)]/35"
                  >
                    <span className="h-2 w-2 shrink-0 rounded-full bg-[var(--nt-peach)]" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-white/92">
                        {grid[i]?.title || 'Connect your CMS to populate this lane.'}
                      </p>
                      <p className="text-xs text-white/50">
                        {grid[i]?.publishedAt
                          ? new Date(grid[i].publishedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
                          : 'Awaiting publish activity'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl border border-dashed border-white/15 bg-white/[0.03] p-4 text-xs leading-relaxed text-white/60">
                The homepage highlights your latest wire items. Older releases stay in the archive with category and date filters.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-[color-mix(in_oklab,white_70%,var(--nt-cream))] py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-3 px-4 text-center sm:px-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">Signal</p>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Formatted for scanning: category labels, publish timestamps, and summaries stay visible before readers open the full page.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-3">
          {[
            {
              title: 'Editorial structure',
              body: 'Lead context, body copy, and metadata follow a predictable rhythm so teams can publish quickly.',
              icon: Sparkles,
            },
            {
              title: 'Trust-forward layout',
              body: 'Readers see dates, authors, and categories up front—similar to professional wire products.',
              icon: Shield,
            },
            {
              title: 'Archive that scales',
              body: 'Grid view with filters keeps long-term announcements discoverable without cluttering the homepage.',
              icon: Radio,
            },
          ].map(({ title, body, icon: Icon }) => (
            <div
              key={title}
              className="rounded-3xl border border-border bg-card p-7 shadow-[0_18px_50px_rgba(49,17,44,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_60px_rgba(49,17,44,0.09)]"
            >
              <Icon className="h-6 w-6 text-[var(--nt-burgundy)]" aria-hidden />
              <h2 className="mt-4 font-display text-xl font-semibold tracking-tight text-[var(--nt-plum)]">{title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-card py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--nt-burgundy)]">{siteContent.taskSectionHeading}</p>
              <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-[var(--nt-plum)]">From the wire</h2>
              <p className="mt-2 max-w-xl text-sm text-muted-foreground">{siteContent.taskSectionDescriptionSuffix}</p>
            </div>
            <Link
              href="/updates"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--nt-burgundy)] transition hover:gap-3"
            >
              Open full archive
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>

          {grid.length ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {grid.map((post) => {
                const href = buildPostUrl('mediaDistribution', post.slug)
                const img = getPostImages(post)[0] || '/placeholder.svg?height=640&width=960'
                return (
                  <Link
                    key={post.id}
                    href={href}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-sm transition hover:-translate-y-1 hover:border-[color-mix(in_oklab,var(--nt-burgundy)_35%,transparent)] hover:shadow-md"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                      <ContentImage
                        src={img}
                        alt={`${post.title} thumbnail`}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-[1.03]"
                        sizes="(max-width: 640px) 100vw, 25vw"
                      />
                      <span className="absolute left-3 top-3 rounded-full bg-[var(--nt-plum)]/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--nt-cream)]">
                        {categoryLabel(post)}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-4">
                      <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                        {post.publishedAt
                          ? new Date(post.publishedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
                          : ''}
                      </p>
                      <h3 className="mt-2 line-clamp-2 font-display text-base font-semibold leading-snug text-[var(--nt-plum)] group-hover:text-[var(--nt-burgundy)]">
                        {post.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{excerpt(post.summary, 110)}</p>
                      <span className="mt-4 text-sm font-semibold text-[var(--nt-burgundy)]">Read release →</span>
                    </div>
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="mt-10 rounded-3xl border border-dashed border-border bg-muted/30 p-12 text-center text-sm text-muted-foreground">
              Published releases will appear here automatically once your feed is connected.
            </div>
          )}
        </div>
      </section>

      {lead ? (
        <section className="bg-[var(--nt-plum)] py-14 text-[var(--nt-cream)]">
          <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-4 sm:flex-row sm:items-center sm:px-6">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--nt-peach)]">Spotlight</p>
              <h2 className="mt-2 max-w-xl font-display text-2xl font-semibold tracking-tight">{lead.title}</h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/75">{excerpt(lead.summary, 200)}</p>
            </div>
            <Link
              href={buildPostUrl('mediaDistribution', lead.slug)}
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[var(--nt-peach)] px-6 py-3 text-sm font-semibold text-[var(--nt-plum)] transition hover:bg-[color-mix(in_oklab,var(--nt-peach)_90%,white)]"
            >
              Read now
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </section>
      ) : null}

      <Footer />
    </div>
  )
}
