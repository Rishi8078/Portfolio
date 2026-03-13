import { test, expect } from '@playwright/test';

test('diagnose application error', async ({ page }) => {
  page.on('console', msg => console.log('BROWSER_CONSOLE:', msg.text()));
  page.on('pageerror', error => console.log('BROWSER_ERROR:', error.message));
  
  await page.goto('http://localhost:5177/');
  await page.waitForTimeout(5000);
  
  const rootContent = await page.evaluate(() => document.getElementById('root')?.innerHTML || 'no root');
  console.log('Root Content snippet:', rootContent.substring(0, 500));
});
