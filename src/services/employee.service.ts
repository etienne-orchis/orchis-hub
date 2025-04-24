import Employee, { IEmployee } from "../models/employee";

export default class EmployeeService {
  static readonly findAll = async (): Promise<IEmployee[]> =>
    await Employee.find({});

  static readonly create = async (employee: IEmployee): Promise<string> => {
    try {
      const newEmployee = new Employee({ name: employee.name });
      await newEmployee.save();
      return newEmployee._id as string;
    } catch (error: any) {
      throw error.toString();
    }
  };

  static readonly update = async (
    _id: string,
    data: Partial<IEmployee>
  ): Promise<void> => {
    await Employee.updateOne({ _id }, { $set: data });
  };

  static readonly findById = async (_id: string): Promise<IEmployee | null> => {
    return await Employee.findById(_id);
  };
}
