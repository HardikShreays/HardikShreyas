// Single source for identity + social links.
// Footer, ContactForm and the JSON-LD in app/layout.tsx all read from here —
// they used to keep their own copies, which is how the footer ended up
// pointing at bare github.com / linkedin.com.

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hardikshreyas.vercel.app'

export const email = 'hardikshreyas8@gmail.com'
export const githubUrl = 'https://github.com/HardikShreays'
export const linkedinUrl = 'https://www.linkedin.com/in/hardik-shreyas/'

export const socialLinks = [
  { name: 'Email', href: `mailto:${email}`, label: email, color: 'hover:text-purple-400' },
  { name: 'GitHub', href: githubUrl, label: 'HardikShreays', color: 'hover:text-gray-400' },
  { name: 'LinkedIn', href: linkedinUrl, label: 'hardik-shreyas', color: 'hover:text-blue-400' },
]
