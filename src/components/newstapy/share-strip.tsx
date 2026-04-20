'use client'

import { Facebook, Linkedin, Link2, Twitter } from 'lucide-react'

type Props = {
  url: string
  title: string
  className?: string
}

export function ShareStrip({ url, title, className }: Props) {
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const links = [
    {
      label: 'Share on X',
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      icon: Twitter,
    },
    {
      label: 'Share on LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: Linkedin,
    },
    {
      label: 'Share on Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: Facebook,
    },
  ]

  return (
    <div className={className}>
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Share</p>
      <div className="flex flex-wrap gap-2">
        {links.map(({ label, href, icon: Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition hover:border-primary/40 hover:bg-primary/5"
            aria-label={label}
          >
            <Icon className="h-4 w-4" aria-hidden />
          </a>
        ))}
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition hover:border-primary/40 hover:bg-primary/5"
          aria-label="Copy link"
          onClick={() => {
            void navigator.clipboard.writeText(url).catch(() => {})
          }}
        >
          <Link2 className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </div>
  )
}
