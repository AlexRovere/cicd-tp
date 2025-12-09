const axios = require("axios");
const app = require("../../src/server");
let server;
let baseURL;

beforeAll((done) => {
  server = app.listen(0, () => {
    const { port } = server.address();
    baseURL = `http://127.0.0.1:${port}`;
    done();
  });
});

afterAll((done) => {
  server.close(done);
});

describe("E2E GET /hello", () => {
  it("responds with Hello world", async () => {
    const res = await axios.get(`${baseURL}/hello`);
    expect(res.status).toBe(200);
    expect(res.data).toBe("Hello world!");
  });
});

describe("E2E GET /hello/:name", () => {
  it("responds with personalized greeting", async () => {
    const res = await axios.get(`${baseURL}/hello/Alice`);
    expect(res.status).toBe(200);
    expect(res.data).toBe("Hello Alice!");
  });
});

describe("E2E GET /nonexistent", () => {
  it("responds with 404", async () => {
    try {
      await axios.get(`${baseURL}/nonexistent`);
      throw new Error("Request should have failed");
    } catch (err) {
      expect(err.response.status).toBe(404);
    }
  });
});
