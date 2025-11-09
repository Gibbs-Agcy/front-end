/**
 * Constants for Gibbs Agency project
 */

export const SITE_CONFIG = {
  name: 'Gibbs Agency',
  description: 'Modern web solutions and digital experiences',
  url: 'https://gibbs-agency.com',
  ogImage: '/og-image.jpg',
  links: {
    twitter: 'https://twitter.com/gibbsagency',
    github: 'https://github.com/gibbsagency',
    linkedin: 'https://linkedin.com/company/gibbsagency',
  },
} as const

export const NAVIGATION = [
  { name: 'Ana Sayfa', href: '/' },
  { name: 'Hakkımızda', href: '/about' },
  { name: 'Hizmetler', href: '#services' },
  { name: 'Portföy', href: '#portfolio' },
  { name: 'İletişim', href: '#contact' },
] as const

export const SOCIAL_LINKS = [
  { name: 'Twitter', href: SITE_CONFIG.links.twitter, icon: 'twitter' },
  { name: 'GitHub', href: SITE_CONFIG.links.github, icon: 'github' },
  { name: 'LinkedIn', href: SITE_CONFIG.links.linkedin, icon: 'linkedin' },
] as const

