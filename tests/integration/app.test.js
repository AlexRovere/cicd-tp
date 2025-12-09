const request = require("supertest");
const app = require("../../src/server");

describe("GET /hello", () => {
  it("should return Hello world", async () => {
    const res = await request(app).get("/hello");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Hello world!");
  });

  it("should return 404 for non-existent route", async () => {
    const res = await request(app).get("/nonexistent");
    expect(res.statusCode).toBe(404);
  });
});

describe("GET /hello/:name", () => {
  it("should return personalized greeting", async () => {
    const res = await request(app).get("/hello/Alice");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Hello Alice!");
  });
});
