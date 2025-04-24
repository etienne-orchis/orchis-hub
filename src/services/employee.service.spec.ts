import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import EmployeeService from "./employee.service";
import Employee from "../models/employee";

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
    const newId = await EmployeeService.create(newEmployee);
    expect(newId).toBeTruthy();
    const employees = await EmployeeService.findAll();
    expect(employees).toHaveLength(1);
    expect(employees[0].name).toBe("John Doe");
  });

  it("should update an employee", async () => {
    const id = await EmployeeService.create({ name: "Ancien" });
    await EmployeeService.update(id, { name: "Nouveau" });
    const updated = await EmployeeService.findById(id);
    console.log(await Employee.find({}));
    expect(updated?.name).toBe("Nouveau");
  });
});
