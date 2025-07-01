import { test, expect } from '@playwright/test';

test.describe('CV - Maxime BELLET', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load the main page correctly', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/Maxime BELLET - Ingénieur DevSecOps SRE/);
    
    // Check main heading
    await expect(page.getByRole('heading', { name: 'Maxime BELLET' })).toBeVisible();
    
    // Check subtitle
    await expect(page.getByText('Ingénieur DevSecOps SRE')).toBeVisible();
  });

  test('should display contact information', async ({ page }) => {
    // Check email link
    await expect(page.getByRole('link', { name: /maxime\.bllt@icloud\.com/ })).toBeVisible();
    
    // Check phone link
    await expect(page.getByRole('link', { name: /\+337 82 01 86 95/ })).toBeVisible();
    
    // Check location
    await expect(page.getByText('Lyon')).toBeVisible();
  });

  test('should display all sections when visible', async ({ page }) => {
    // Check main sections
    await expect(page.getByRole('heading', { name: 'À propos' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Expérience professionnelle' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Diplômes et formations' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Compétences' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Profils' })).toBeVisible();
  });

  test('should have working dark mode toggle', async ({ page }) => {
    const themeButton = page.getByRole('button', { name: /Mode/ });
    await expect(themeButton).toBeVisible();
    
    // Check initial state (should be light mode)
    const body = page.locator('body');
    await expect(body).not.toHaveClass(/dark/);
    
    // Toggle to dark mode
    await themeButton.click();
    await expect(body).toHaveClass(/dark/);
    
    // Toggle back to light mode
    await themeButton.click();
    await expect(body).not.toHaveClass(/dark/);
  });

  test('should have working CV download link', async ({ page }) => {
    const downloadLink = page.getByRole('link', { name: /Télécharger CV/ });
    await expect(downloadLink).toBeVisible();
    await expect(downloadLink).toHaveAttribute('href', './cv.pdf');
    await expect(downloadLink).toHaveAttribute('target', '_blank');
  });

  test('should display profile image', async ({ page }) => {
    // Check desktop profile image
    const desktopImage = page.locator('picture.hidden.sm\\:block img');
    await expect(desktopImage).toBeVisible();
    await expect(desktopImage).toHaveAttribute('alt', /Photo de profil de Maxime BELLET/);
    
    // For mobile, we'd need to change viewport
    await page.setViewportSize({ width: 375, height: 667 });
    const mobileImage = page.locator('picture.sm\\:hidden img');
    await expect(mobileImage).toBeVisible();
  });

  test('should have proper accessibility features', async ({ page }) => {
    // Check skip link
    const skipLink = page.getByRole('link', { name: 'Aller au contenu principal' });
    await expect(skipLink).toBeInDOM();
    
    // Check main landmark
    await expect(page.getByRole('main')).toBeVisible();
    
    // Check proper heading hierarchy
    const h1 = page.getByRole('heading', { level: 1 });
    await expect(h1).toHaveCount(1);
    await expect(h1).toHaveText('Maxime BELLET');
  });

  test('should be responsive', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.getByRole('heading', { name: 'Maxime BELLET' })).toBeVisible();
    
    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.getByRole('heading', { name: 'Maxime BELLET' })).toBeVisible();
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1200, height: 800 });
    await expect(page.getByRole('heading', { name: 'Maxime BELLET' })).toBeVisible();
  });

  test('should have working external links', async ({ page }) => {
    // Check LinkedIn link
    const linkedinLink = page.getByRole('link', { name: /maxime-bellet/ });
    await expect(linkedinLink).toBeVisible();
    await expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/maxime-bellet/');
    await expect(linkedinLink).toHaveAttribute('target', '_blank');
    await expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
    
    // Check GitHub link
    const githubLink = page.getByRole('link', { name: /tellebma/ });
    await expect(githubLink).toBeVisible();
    await expect(githubLink).toHaveAttribute('href', 'https://github.com/tellebma');
    await expect(githubLink).toHaveAttribute('target', '_blank');
  });

  test('should load performance assets', async ({ page }) => {
    // Check that critical CSS is loaded
    const styles = await page.evaluate(() => {
      const link = document.querySelector('link[href*="global.css"]');
      return link ? true : false;
    });
    expect(styles).toBeTruthy();
    
    // Check that images have proper attributes
    const images = page.locator('img');
    const count = await images.count();
    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      await expect(img).toHaveAttribute('alt');
    }
  });
});

test.describe('SEO and Meta tags', () => {
  test('should have proper meta tags', async ({ page }) => {
    await page.goto('/');
    
    // Check meta description
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /CV de Maxime BELLET/);
    
    // Check Open Graph tags
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /Maxime BELLET/);
    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'profile');
    
    // Check structured data
    const structuredData = page.locator('script[type="application/ld+json"]');
    await expect(structuredData).toBeInDOM();
  });
});

test.describe('PWA Features', () => {
  test('should have manifest link', async ({ page }) => {
    await page.goto('/');
    
    const manifestLink = page.locator('link[rel="manifest"]');
    await expect(manifestLink).toHaveAttribute('href', './manifest.json');
  });

  test('should register service worker', async ({ page }) => {
    await page.goto('/');
    
    // Check if service worker registration code is present
    const swScript = await page.evaluate(() => {
      return document.documentElement.innerHTML.includes('serviceWorker');
    });
    expect(swScript).toBeTruthy();
  });
});