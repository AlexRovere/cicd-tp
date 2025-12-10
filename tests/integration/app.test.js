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

  it("should return default greeting when name is empty", async () => {
    const res = await request(app).get("/hello/");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Hello world!");
  });

  it("should return default greeting when name is only spaces", async () => {
    const res = await request(app).get("/hello/   /");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Hello world!");
  });

  it("should return personalized greeting with special characters", async () => {
    const res = await request(app).get("/hello/Alice@123");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Hello Alice@123!");
  });

  it("should return personalized greeting with a very long name", async () => {
    const longName = "a".repeat(1000);
    const res = await request(app).get(`/hello/${longName}`);
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe(`Hello ${longName}!`);
  });
});

describe("POST /hello", () => {
  it("should return personalized greeting from header", async () => {
    const res = await request(app)
      .post("/hello")
      .set("X-Name", "Bob");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Hello Bob!");
  });

  it("should return default greeting when no name is provided in header", async () => {
    const res = await request(app)
      .post("/hello");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Hello world!");
  });
});
