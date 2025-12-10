const { chromium } = require('playwright');
const app = require('../../src/server');

describe('End-to-End Tests', () => {
  let browser;
  let page;
  let server;
  let port;

  beforeAll(async () => {
    // Start the server and wait for it to be ready
    server = await new Promise((resolve) => {
      const srv = app.listen(0, () => {
        port = srv.address().port;
        resolve(srv);
      });
    });

    // Launch browser
    browser = await chromium.launch();
    page = await browser.newPage();
  }, 30000);

  afterAll(async () => {
    if (browser) await browser.close();
    if (server) server.close();
  });

  it('should display the default greeting on the home page', async () => {
    await page.goto(`http://localhost:${port}/hello`);
    const content = await page.textContent('body');
    expect(content).toContain('Hello world!');
  });

  it('should display a personalized greeting when a name is provided', async () => {
    await page.goto(`http://localhost:${port}/hello/Alice`);
    const content = await page.textContent('body');
    expect(content).toContain('Hello Alice!');
  });

  it('should display the default greeting when an empty name is provided', async () => {
    await page.goto(`http://localhost:${port}/hello/`);
    const content = await page.textContent('body');
    expect(content).toContain('Hello world!');
  });

  it('should display the default greeting when only spaces are provided', async () => {
    await page.goto(`http://localhost:${port}/hello/   /`);
    const content = await page.textContent('body');
    expect(content).toContain('Hello world!');
  });

  it('should display a personalized greeting with special characters', async () => {
    await page.goto(`http://localhost:${port}/hello/Alice@123`);
    const content = await page.textContent('body');
    expect(content).toContain('Hello Alice@123!');
  });

  it('should display a personalized greeting with a very long name', async () => {
    const longName = 'a'.repeat(1000);
    await page.goto(`http://localhost:${port}/hello/${longName}`);
    const content = await page.textContent('body');
    expect(content).toContain(`Hello ${longName}!`);
  });

  it('should return 404 for non-existent route', async () => {
    await page.goto(`http://localhost:${port}/nonexistent`);
    const content = await page.textContent('body');
    expect(content).toContain('Cannot GET /nonexistent');
  });
});