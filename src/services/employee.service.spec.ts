import { GenericContainer } from "testcontainers";
import mongoose from "mongoose";
import request from "supertest";
import app from "../index"; 

let mongoContainer: any;

beforeAll(async () => {
  mongoContainer = await new GenericContainer("mongo")
    .withExposedPorts(27017)
    .start();

  const mongoUri = `mongodb://localhost:${mongoContainer.getMappedPort(27017)}/test`;

  await mongoose.connect(mongoUri);
}); 

afterAll(async () => {
  await mongoose.disconnect();

  await mongoContainer.stop();
});

describe("Employee API (/api/employees)", () => {
  it("should POST and GET an employee", async () => {
    const employeeData = { name: "Alice" };

    const postRes = await request(app).post("/api/employees").send(employeeData);
    expect(postRes.status).toBe(201);

    const getRes = await request(app).get("/api/employees");
    expect(getRes.status).toBe(200);
    expect(getRes.body.length).toBe(1);
  });
});
