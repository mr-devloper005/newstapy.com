import Link from 'next/link'
import { Search } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { TaskListClient } from '@/components/tasks/task-list-client'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { fetchTaskPosts } from '@/lib/task-data'
import { SITE_CONFIG, getTaskConfig, type TaskKey } from '@/lib/site-config'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { taskIntroCopy } from '@/config/site.content'

export const TASK_LIST_PAGE_OVERRIDE_ENABLED = true

export async function TaskListPageOverride({
  task,
  category,
  period,
}: {
  task: TaskKey
  category?: string
  period?: '7d' | '30d' | '90d'
}) {
  const taskConfig = getTaskConfig(task)
  const posts = await fetchTaskPosts(task, 48, { fresh: true })
  const normalizedCategory = category ? normalizeCategory(category) : 'all'
  const intro = taskIntroCopy[task]
  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, '')

  const schemaItems = posts.slice(0, 10).map((post, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    url: `${baseUrl}${taskConfig?.route || '/updates'}/${post.slug}`,
    name: post.title,
  }))

  return (
    <div className="min-h-screen bg-background">
      <NavbarShell />
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
        <SchemaJsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: `${taskConfig?.label || 'Releases'} | ${SITE_CONFIG.name}`,
            url: `${baseUrl}${taskConfig?.route || ''}`,
            hasPart: schemaItems,
          }}
        />

        <header className="max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[var(--nt-burgundy)]">Archive</p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-[var(--nt-plum)] sm:text-5xl">{taskConfig?.label || 'Press releases'}</h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">{taskConfig?.description}</p>
        </header>

        <div className="mt-10 flex flex-col gap-4 rounded-3xl border border-border bg-card p-5 shadow-sm sm:flex-row sm:items-end sm:justify-between">
          <form action={taskConfig?.route || '/updates'} method="get" className="flex w-full flex-col gap-3 sm:max-w-xl sm:flex-row sm:items-center">
            <div className="flex-1">
              <label htmlFor="cat" className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Category
              </label>
              <select
                id="cat"
                name="category"
                defaultValue={normalizedCategory === 'all' ? '' : normalizedCategory}
                className="mt-1.5 h-11 w-full rounded-xl border border-border bg-background px-3 text-sm"
              >
                <option value="">All categories</option>
                {CATEGORY_OPTIONS.map((item) => (
                  <option key={item.slug} value={item.slug}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label htmlFor="period" className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Published
              </label>
              <select
                id="period"
                name="period"
                defaultValue={period || ''}
                className="mt-1.5 h-11 w-full rounded-xl border border-border bg-background px-3 text-sm"
              >
                <option value="">Any time</option>
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
            </div>
            <button
              type="submit"
              className="h-11 shrink-0 rounded-xl bg-[var(--nt-burgundy)] px-6 text-sm font-semibold text-white transition hover:bg-[color-mix(in_oklab,var(--nt-burgundy)_90%,black)] sm:mt-6"
            >
              Apply
            </button>
          </form>

          <form action="/search" method="get" className="flex w-full gap-0 overflow-hidden rounded-xl border border-border sm:mt-6 sm:w-auto">
            <input
              name="q"
              placeholder="Search releases…"
              className="h-11 min-w-0 flex-1 border-0 bg-background px-4 text-sm outline-none"
              aria-label="Search releases"
            />
            <button type="submit" className="flex h-11 w-12 shrink-0 items-center justify-center bg-[var(--nt-plum)] text-[var(--nt-cream)] transition hover:bg-[color-mix(in_oklab,var(--nt-plum)_92%,black)]" aria-label="Submit search">
              <Search className="h-4 w-4" />
            </button>
          </form>
        </div>

        {intro ? (
          <section className="mt-10 rounded-3xl border border-border bg-[color-mix(in_oklab,white_82%,var(--nt-cream))] p-6 sm:p-8">
            <h2 className="font-display text-xl font-semibold text-[var(--nt-plum)]">{intro.title}</h2>
            {intro.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 48)} className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
            <div className="mt-4 flex flex-wrap gap-4 text-sm font-medium">
              {intro.links.map((link) => (
                <Link key={link.href} href={link.href} className="text-[var(--nt-burgundy)] underline-offset-4 hover:underline">
                  {link.label}
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <div className="mt-12">
          <TaskListClient
            task={task}
            initialPosts={posts}
            category={normalizedCategory}
            period={period}
            gridClassName="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          />
        </div>
      </main>
      <Footer />
    </div>
  )
}
