import Employee, { IEmployee } from "../models/employee";

export default class EmployeeService {
  static readonly findAll = async (): Promise<IEmployee[]> =>
    await Employee.find({});
}
