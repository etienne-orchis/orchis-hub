import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import EmployeeService from "./employee.service";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("EmployeeService", () => {
  it("should work", () => {
    expect(1).toEqual(1);
  });

  it("should save and retrieve an employee", async () => {
    const newEmployee = { name: "John Doe" };
    await EmployeeService.create(newEmployee);
    const employees = await EmployeeService.findAll();
    expect(employees).toHaveLength(1);
    expect(employees[0].name).toBe("John Doe");
  });
});
