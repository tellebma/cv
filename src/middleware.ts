import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  // Get the response
  const response = await next();
  
  // Add security headers
  const headers = new Headers(response.headers);
  
  // Content Security Policy
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://unpkg.com https://analytics.tellebma.fr",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: https: blob:",
    "connect-src 'self' https://analytics.tellebma.fr https://vitals.vercel-analytics.com",
    "frame-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests"
  ].join('; ');
  
  headers.set('Content-Security-Policy', csp);
  
  // Additional security headers
  headers.set('X-Frame-Options', 'DENY');
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()');
  
  // HSTS (only in production)
  if (context.url.protocol === 'https:') {
    headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  }
  
  // Cache control for different asset types
  const pathname = context.url.pathname;
  
  if (pathname.endsWith('.pdf')) {
    headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  } else if (pathname.match(/\.(js|css|png|jpg|jpeg|webp|svg|ico|woff2?)$/)) {
    headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  } else if (pathname === '/' || pathname.endsWith('.html')) {
    headers.set('Cache-Control', 'public, max-age=3600, must-revalidate');
  }
  
  // Add performance hints
  if (pathname === '/') {
    headers.set('Link', [
      '</images/profile.jpg>; rel=preload; as=image',
      '</fonts/font-display.css>; rel=preload; as=style',
      '<https://unpkg.com/phosphor-icons>; rel=preconnect; crossorigin'
    ].join(', '));
  }
  
  // Create new response with updated headers
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
});