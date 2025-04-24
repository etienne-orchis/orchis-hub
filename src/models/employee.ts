import { Schema, model } from "mongoose";

interface IEmployee {
  name: string;
}

const employeeSchema = new Schema<IEmployee>({
  name: { type: String, required: true },
});

const Employee = model<IEmployee>("Employee", employeeSchema);

export default Employee;
