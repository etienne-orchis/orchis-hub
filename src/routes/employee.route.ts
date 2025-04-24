import { Router } from "express";
import EmployeeController from "../controllers/employee.controller";

const employeeRouter = Router();

employeeRouter.get("/", async (req, res) => {
  const employees = await EmployeeController.findAll();
  res.json(employees);
});

export default employeeRouter;
