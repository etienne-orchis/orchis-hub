import mongoose from 'mongoose';
import dotenv from 'dotenv';
import EmployeeService from './employee.service';
import Employee from '../models/employee';

dotenv.config({ path: '.env' });

beforeAll(async () => {
  await mongoose.connect(process.env.DATABASE_URL_TEST!);
});

describe('EmployeeService Integration', () => {
  it('devrait créer un employé et le retrouver', async () => {
    const id = await EmployeeService.create({ name: 'Hardy' } as any);
    expect(id).toBeDefined();

    const employees = await EmployeeService.findAll();
    expect(employees[0].name).toBe('Hardy');
  });
});
