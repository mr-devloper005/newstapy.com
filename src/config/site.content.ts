import type { TaskKey } from '@/lib/site-config'

export const siteContent = {
  navbar: {
    tagline: 'Press & media distribution',
  },
  footer: {
    tagline: 'Distribution-ready publishing',
  },
  hero: {
    badge: 'Press wire',
    title: ['National-style reach without the noise.'],
    description:
      'Publish releases with a clean archive, structured metadata, and reading pages tuned for journalists and subscribers.',
    primaryCta: {
      label: 'Browse releases',
      href: '/updates',
    },
    secondaryCta: {
      label: 'View plans',
      href: '/pricing',
    },
    searchPlaceholder: 'Search releases',
    focusLabel: 'Latest',
    featureCardBadge: 'Distribution',
    featureCardTitle: 'Releases stay easy to scan.',
    featureCardDescription:
      'Headlines, categories, and publish dates stay visible so your archive works as a discovery surface—not a blog template.',
  },
  home: {
    metadata: {
      title: 'NewsTapy — Press release publishing',
      description:
        'Publish and browse press releases with a modern archive, structured presentation, and reader-friendly detail pages.',
      openGraphTitle: 'NewsTapy — Press release publishing',
      openGraphDescription:
        'Distribution-focused press releases with a searchable archive and polished reading experience.',
      keywords: ['press releases', 'media distribution', 'announcements', 'NewsTapy'],
    },
    introBadge: 'Why NewsTapy',
    introTitle: 'Built for teams that ship announcements on a schedule.',
    introParagraphs: [
      'The interface prioritizes scanning: categories, dates, and summaries stay visible before the full read.',
      'Detail pages are structured like professional wire copy—lead context, body content, and share actions stay in predictable places.',
      'When your feed is connected, the homepage and archive populate automatically from published releases.',
    ],
    sideBadge: 'What you get',
    sidePoints: [
      'Hero positioning for the latest release.',
      'Archive grid with filters for category and recency.',
      'Article pages with featured imagery and related items.',
      'Pricing transparency for distribution tiers.',
    ],
    primaryLink: {
      label: 'Open archive',
      href: '/updates',
    },
    secondaryLink: {
      label: 'Talk to us',
      href: '/contact',
    },
  },
  cta: {
    badge: 'Ready',
    title: 'Need a calm, credible place for outbound announcements?',
    description:
      'Use NewsTapy when clarity and cadence matter more than decorative marketing chrome.',
    primaryCta: {
      label: 'Contact',
      href: '/contact',
    },
    secondaryCta: {
      label: 'Browse releases',
      href: '/updates',
    },
  },
  taskSectionHeading: 'Latest releases',
  taskSectionDescriptionSuffix: 'Newest items from the wire.',
} as const

export const taskPageMetadata: Record<Exclude<TaskKey, 'comment' | 'org' | 'social'>, { title: string; description: string }> = {
  article: {
    title: 'Articles',
    description: 'Read the latest posts and long-form updates.',
  },
  listing: {
    title: 'Listings',
    description: 'Explore listings and directory-style entries.',
  },
  classified: {
    title: 'Classifieds',
    description: 'Browse classifieds and short-form notices.',
  },
  image: {
    title: 'Images',
    description: 'Browse image-led updates and visual posts.',
  },
  profile: {
    title: 'Profiles',
    description: 'View profile pages and public identities.',
  },
  sbm: {
    title: 'Bookmarks',
    description: 'Browse curated resources and saved links.',
  },
  pdf: {
    title: 'Resources',
    description: 'Open PDFs and downloadable files.',
  },
  mediaDistribution: {
    title: 'Press releases',
    description: 'Search and filter official releases by category and date.',
  },
}

export const taskIntroCopy: Record<
  TaskKey,
  { title: string; paragraphs: string[]; links: { label: string; href: string }[] }
> = {
  listing: { title: 'Listings', paragraphs: ['Directory entries and service pages.'], links: [{ label: 'Home', href: '/' }] },
  article: { title: 'Articles', paragraphs: ['General long-form article feed.'], links: [{ label: 'Home', href: '/' }] },
  classified: { title: 'Classifieds', paragraphs: ['Short-form posts and notices.'], links: [{ label: 'Home', href: '/' }] },
  image: { title: 'Images', paragraphs: ['Image-first posts and galleries.'], links: [{ label: 'Home', href: '/' }] },
  profile: { title: 'Profiles', paragraphs: ['Profile pages and identity surfaces.'], links: [{ label: 'Home', href: '/' }] },
  sbm: { title: 'Bookmarks', paragraphs: ['Curated saved links and references.'], links: [{ label: 'Home', href: '/' }] },
  pdf: { title: 'Resources', paragraphs: ['Downloadable files and documents.'], links: [{ label: 'Home', href: '/' }] },
  social: { title: 'Social', paragraphs: ['Short updates and activity.'], links: [{ label: 'Home', href: '/' }] },
  comment: { title: 'Comments', paragraphs: ['Commentary and response posts.'], links: [{ label: 'Home', href: '/' }] },
  org: { title: 'Organizations', paragraphs: ['Organization pages and entities.'], links: [{ label: 'Home', href: '/' }] },
  mediaDistribution: {
    title: 'Press archive',
    paragraphs: [
      'Filter by topic or narrow the timeline to focus on what changed recently.',
      'Each card opens a full release page with share actions and related items when available.',
    ],
    links: [
      { label: 'Home', href: '/' },
      { label: 'Pricing', href: '/pricing' },
    ],
  },
}
