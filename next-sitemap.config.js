/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.iqm.org.my',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/admin', '/admin/*', '/api/*'],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: ['/admin', '/api'] },
    ],
  },
  transform: async (cfg, path) => {
    const dynamicRoutes = ['/members-directory', '/mrca-auditors-directory', '/mrca-consultants-directory', '/events', '/gallery']
    return {
      loc: path,
      changefreq: dynamicRoutes.some((r) => path.startsWith(r)) ? 'weekly' : 'monthly',
      priority: path === '/' ? 1.0 : path.includes('directory') ? 0.7 : 0.8,
      lastmod: new Date().toISOString(),
    }
  },
}

export default config
