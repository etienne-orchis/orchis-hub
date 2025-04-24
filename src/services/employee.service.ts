import Employee, { IEmployee } from "../models/employee";

export default class EmployeeService {
  static readonly findAll = async (): Promise<IEmployee[]> =>
    await Employee.find({});

  static readonly create = async (employee: IEmployee): Promise<string> => {
    try {
      const newEmployee = new Employee({ name: employee.name });
      await newEmployee.save();
      return `New employee created successfully , with the _id ${newEmployee._id as string}`;
    } catch (error: any) {
      throw error.toString();
    }
  };
}
