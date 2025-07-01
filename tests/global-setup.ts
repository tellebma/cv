import { chromium, type FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  console.log('🚀 Starting global test setup...');
  
  // You can add global setup logic here
  // For example: database seeding, auth setup, etc.
  
  // Check if the application is accessible
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    await page.goto('http://localhost:4321', { waitUntil: 'networkidle' });
    console.log('✅ Application is accessible');
  } catch (error) {
    console.error('❌ Application is not accessible:', error);
    throw error;
  } finally {
    await page.close();
    await browser.close();
  }
  
  console.log('✅ Global setup completed');
}

export default globalSetup;