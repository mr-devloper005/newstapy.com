import Link from 'next/link'
import { notFound } from 'next/navigation'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { ContentImage } from '@/components/shared/content-image'
import { TaskPostCard } from '@/components/shared/task-post-card'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { ShareStrip } from '@/components/newstapy/share-strip'
import { fetchTaskPostBySlug, fetchTaskPosts, buildPostUrl, getPostImages } from '@/lib/task-data'
import { SITE_CONFIG, getTaskConfig, type TaskKey } from '@/lib/site-config'
import { formatRichHtml, RichContent } from '@/components/shared/rich-content'
import type { SitePost } from '@/lib/site-connector'

export const TASK_DETAIL_PAGE_OVERRIDE_ENABLED = true

function getContentRecord(post: SitePost) {
  return post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
}

export async function TaskDetailPageOverride({ task, slug }: { task: TaskKey; slug: string }) {
  const post = await fetchTaskPostBySlug(task, slug)
  if (!post) notFound()

  const taskConfig = getTaskConfig(task)
  const content = getContentRecord(post)
  const html = formatRichHtml((typeof content.body === 'string' ? content.body : '') || post.summary || '', '')
  const subtitle =
    post.summary ||
    (typeof content.excerpt === 'string' ? content.excerpt : '') ||
    ''
  const category =
    (typeof content.category === 'string' && content.category.trim()) ||
    post.tags?.find((t) => typeof t === 'string') ||
    'Press release'
  const author = post.authorName || (typeof content.author === 'string' ? content.author : '') || 'Newsroom'
  const published = post.publishedAt
    ? new Date(post.publishedAt).toLocaleString(undefined, {
        dateStyle: 'medium',
        timeStyle: 'short',
      })
    : ''
  const images = getPostImages(post)
  const hero = images[0] || '/placeholder.svg?height=900&width=1600'

  const related = (await fetchTaskPosts(task, 12, { fresh: true }))
    .filter((item) => item.slug !== post.slug)
    .slice(0, 4)

  const path = buildPostUrl(task, post.slug)
  const absoluteUrl = `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}${path}`

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: post.title,
    description: subtitle,
    image: images.length ? images.map((u) => (u.startsWith('http') ? u : `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}${u}`)) : undefined,
    datePublished: post.publishedAt || undefined,
    author: { '@type': 'Person', name: author },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': absoluteUrl,
    },
  }

  return (
    <div className="min-h-screen bg-background">
      <NavbarShell />
      <SchemaJsonLd data={articleSchema} />

      <article>
        <header className="border-b border-border bg-card">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
            <nav className="text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground">
                Home
              </Link>
              <span className="mx-2 text-border">/</span>
              <Link href={taskConfig?.route || '/updates'} className="hover:text-foreground">
                {taskConfig?.label || 'Press'}
              </Link>
            </nav>
            <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--nt-burgundy)]">Press release</p>
            <h1 className="mt-3 max-w-4xl font-display text-4xl font-semibold tracking-tight text-[var(--nt-plum)] sm:text-[2.65rem] sm:leading-[1.12]">
              {post.title}
            </h1>
            {subtitle ? (
              <p className="mt-5 max-w-3xl border-l-4 border-[var(--nt-peach)] bg-[color-mix(in_oklab,white_88%,var(--nt-cream))] py-3 pl-5 pr-4 text-lg italic leading-relaxed text-muted-foreground">
                {subtitle}
              </p>
            ) : null}
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span>
                <span className="font-medium text-foreground">{author}</span>
              </span>
              {published ? <time dateTime={post.publishedAt}>{published}</time> : null}
              <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--nt-plum)]">{String(category)}</span>
            </div>
          </div>
        </header>

        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-12 lg:py-14">
          <div>
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-border bg-muted shadow-sm">
              <ContentImage
                src={hero}
                alt={`${post.title} featured`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 66vw"
                priority
              />
            </div>

            <ShareStrip url={absoluteUrl} title={post.title} className="mt-8" />

            <RichContent html={html} className="article-content mt-10 max-w-none text-base leading-[1.8] text-foreground" />

            {related.length ? (
              <section className="mt-16 border-t border-border pt-12">
                <h2 className="font-display text-2xl font-semibold text-[var(--nt-plum)]">Related releases</h2>
                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  {related.map((item) => (
                    <TaskPostCard key={item.id} post={item} href={buildPostUrl(task, item.slug)} taskKey={task} />
                  ))}
                </div>
              </section>
            ) : null}
          </div>

          <aside className="space-y-6 lg:pt-4">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Publisher</p>
              <div className="mt-4 flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--nt-plum)] text-sm font-bold text-[var(--nt-cream)]">N</span>
                <div>
                  <p className="font-semibold text-[var(--nt-plum)]">{SITE_CONFIG.name}</p>
                  <p className="text-xs text-muted-foreground">{SITE_CONFIG.tagline}</p>
                </div>
              </div>
              <Link
                href={taskConfig?.route || '/updates'}
                className="mt-5 inline-flex w-full items-center justify-center rounded-xl border border-border py-2.5 text-sm font-semibold text-[var(--nt-burgundy)] transition hover:bg-muted"
              >
                More releases
              </Link>
            </div>

            <div className="rounded-3xl border border-border bg-[color-mix(in_oklab,white_90%,var(--nt-cream))] p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Looking for something?</p>
              <form action="/search" method="get" className="mt-4 flex gap-0 overflow-hidden rounded-xl border border-border">
                <input name="q" className="h-11 min-w-0 flex-1 border-0 bg-background px-3 text-sm" placeholder="Search…" />
                <button type="submit" className="bg-[var(--nt-plum)] px-4 text-xs font-semibold text-[var(--nt-cream)]">
                  Go
                </button>
              </form>
            </div>
          </aside>
        </div>
      </article>

      <Footer />
    </div>
  )
}
