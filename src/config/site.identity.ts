export const siteIdentity = {
  code: process.env.NEXT_PUBLIC_SITE_CODE || 'p8fkstb2u9',
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'NewsTapy',
  tagline: process.env.NEXT_PUBLIC_SITE_TAGLINE || 'Press distribution built for clarity',
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    'NewsTapy helps teams publish press releases with structured formatting, readable archives, and distribution-focused presentation.',
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || 'newstapy.com',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://newstapy.com',
  ogImage: process.env.NEXT_PUBLIC_SITE_OG_IMAGE || '/og-default.png',
  googleMapsEmbedApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY || '',
} as const

export const defaultAuthorProfile = {
  name: siteIdentity.name,
  avatar: '/placeholder.svg?height=80&width=80',
} as const
