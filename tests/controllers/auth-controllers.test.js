/*
відповідь повина мати статус-код 200
у відповіді повинен повертатися токен
у відповіді повинен повертатися об'єкт user з 2 полями email и subscription з типом даних String
 */
const request = require("supertest");
const app = require("../../app");
const mongoose = require("mongoose");
const { DB_HOST } = process.env;

beforeEach(async () => {
  await mongoose.connect(DB_HOST);
});

afterEach(async () => {
  await mongoose.connection.close();
});

describe("POST/signin", () => {
  describe("given email and password", () => {
    test("should response status code 200", async () => {
      const response = await request(app).post("/api/auth/signin").send({
        email: "dima1@mail.com",
        password: "123456",
      });
      expect(response.statusCode).toBe(200);
    });
  });
  describe("given email and password", () => {
    test("should response with token", async () => {
      const response = await request(app).post("/api/auth/signin").send({
        email: "dima1@mail.com",
        password: "123456",
      });
      expect(response.body).toHaveProperty("token");
    });
  });
  describe("given email and password", () => {
    test("should response with user: { email:String, subscription:String}", async () => {
      const response = await request(app).post("/api/auth/signin").send({
        email: "dima1@mail.com",
        password: "123456",
      });

      expect(response.body).toMatchObject({
        user: {
          email: expect.any(String),
          subscription: expect.any(String),
        },
      });
    });
  });
});
