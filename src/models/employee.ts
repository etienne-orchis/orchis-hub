import { ObjectId, Schema, model } from "mongoose";

export interface IEmployee {
  _id?: string | ObjectId;
  name: string;
}

const employeeSchema = new Schema<IEmployee>(
  {
    name: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

const Employee = model<IEmployee>("Employee", employeeSchema);

export default Employee;
