const { chromium } = require('playwright');
const { getGreeting } = require('../../src/greeting');

describe('End-to-End Tests', () => {
  let browser;
  let page;
  let server;

  beforeAll(async () => {
    // Start the server
    const { app } = require('../../src/server');
    server = app.listen(0, () => {
      const { port } = server.address();
      global.__SERVER_PORT__ = port;
    });

    // Launch browser
    browser = await chromium.launch();
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.close();
  });

  it('should display the default greeting on the home page', async () => {
    await page.goto(`http://localhost:${global.__SERVER_PORT__}/hello`);
    const content = await page.textContent('body');
    expect(content).toContain('Hello world!');
  });

  it('should display a personalized greeting when a name is provided', async () => {
    await page.goto(`http://localhost:${global.__SERVER_PORT__}/hello/Alice`);
    const content = await page.textContent('body');
    expect(content).toContain('Hello Alice!');
  });

  it('should display the default greeting when an empty name is provided', async () => {
    await page.goto(`http://localhost:${global.__SERVER_PORT__}/hello/`);
    const content = await page.textContent('body');
    expect(content).toContain('Hello world!');
  });

  it('should display the default greeting when only spaces are provided', async () => {
    await page.goto(`http://localhost:${global.__SERVER_PORT__}/hello/   /`);
    const content = await page.textContent('body');
    expect(content).toContain('Hello world!');
  });

  it('should display a personalized greeting with special characters', async () => {
    await page.goto(`http://localhost:${global.__SERVER_PORT__}/hello/Alice@123`);
    const content = await page.textContent('body');
    expect(content).toContain('Hello Alice@123!');
  });

  it('should display a personalized greeting with a very long name', async () => {
    const longName = 'a'.repeat(1000);
    await page.goto(`http://localhost:${global.__SERVER_PORT__}/hello/${longName}`);
    const content = await page.textContent('body');
    expect(content).toContain(`Hello ${longName}!`);
  });

  it('should return 404 for non-existent route', async () => {
    await page.goto(`http://localhost:${global.__SERVER_PORT__}/nonexistent`);
    const content = await page.textContent('body');
    expect(content).toContain('Cannot GET /nonexistent');
  });
});
