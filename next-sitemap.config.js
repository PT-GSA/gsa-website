/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://gsagroup.id',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  sitemapSize: 7000,
  changefreq: 'weekly',
  priority: 0.7,
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' }
    ]
  }
}; 