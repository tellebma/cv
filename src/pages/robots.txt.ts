import type { APIRoute } from 'astro';

const SITE_URL = 'https://tellebma.github.io';
const BASE_PATH = process.env.BUILD_TARGET === 'github' ? '/cv' : '';

export const GET: APIRoute = async () => {
  const robotsTxt = `User-agent: *
Allow: /

# Sitemap
Sitemap: ${SITE_URL}${BASE_PATH}/sitemap.xml

# Block unnecessary crawling
Disallow: /_astro/
Disallow: /node_modules/
Disallow: /.git/
Disallow: /src/

# Allow specific files
Allow: /cv.pdf
Allow: /images/
Allow: /favicon.svg

# Crawl delay (be nice to servers)
Crawl-delay: 1`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
    },
  });
};