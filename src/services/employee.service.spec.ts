import mongoose from "mongoose";
import request from "supertest";
import DBConnection from "../utils/db-connection";
import app from "..";

describe("Employee API", () => {
  beforeAll(async () => {
    await DBConnection.connect();
  });
  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });
  it("should create a new employee", async () => {
    const res = await request(app)
      .post("/api/employees")
      .send({ name: "John Doe" });

    expect(res.status).toBe(201);
    expect(res.text).toMatch(/New employee created successfully/);
  });

  it("should return a list of employees", async () => {
    const res = await request(app).get("/api/employees");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty("name");
  });
});
