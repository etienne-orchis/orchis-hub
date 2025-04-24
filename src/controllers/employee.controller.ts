import { IEmployee } from "../models/employee";
import EmployeeService from "../services/employee.service";

export default class EmployeeController {
  static readonly findAll = async (): Promise<IEmployee[]> =>
    await EmployeeService.findAll();

  static readonly create = async (name: string): Promise<string> =>
    await EmployeeService.create({ name });
}
