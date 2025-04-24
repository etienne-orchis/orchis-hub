import { Router } from "express";
import EmployeeController from "../controllers/employee.controller";

const employeeRouter = Router();

employeeRouter.get("/", async (req, res) => {
  try {
    const employees = await EmployeeController.findAll();
    res.json(employees);
  } catch (error) {
    res.status(500).send(error);
  }
});

employeeRouter.post("", async (req, res) => {
  try {
    const { name } = req.body;
    const response = await EmployeeController.create(name);
    res.status(201).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default employeeRouter;
