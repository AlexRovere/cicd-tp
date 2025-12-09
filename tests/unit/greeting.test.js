const { getGreeting } = require("../../src/greeting");

describe("getGreeting", () => {
  it("returns the hello world message", () => {
    expect(getGreeting()).toBe("Hello world!");
  });

  it("returns a personalized greeting when name is provided", () => {
    expect(getGreeting("Alice")).toBe("Hello Alice!");
  });

  it("returns a default message when name is empty", () => {
    expect(getGreeting("")).toBe("Hello world!");
  });

  it("returns a default message when name is not a string", () => {
    expect(getGreeting(123)).toBe("Hello world!");
  });
});
