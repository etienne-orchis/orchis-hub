import mongoose from "mongoose";
import request from "supertest";
import DBConnection from "../utils/db-connection";
import app from "..";
import Employee from "../models/employee";

describe("Employee API", () => {
  const createdTestIds: string[] = [];
  beforeAll(async () => {
    await DBConnection.connect();
  });
  afterAll(async () => {
    if (createdTestIds.length > 0) {
        await Employee.deleteMany({ _id: { $in: createdTestIds } });
      }
      await mongoose.connection.close();
  });
  it("should create a new employee", async () => {
    const res = await request(app)
      .post("/api/employees")
      .send({ name: "John Doe" });

    expect(res.status).toBe(201);
    expect(res.text).toMatch(/New employee created successfully/);
    const createdEmployeeId = res.body._id;
    expect(createdEmployeeId).toBeDefined();

    expect(mongoose.Types.ObjectId.isValid(createdEmployeeId)).toBe(true);
    if (createdEmployeeId) {
      createdTestIds.push(createdEmployeeId); 
    }
  });

  it("should return a list of employees", async () => {
    const res = await request(app).get("/api/employees");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty("name");
  });
});
