import Dexie, { Table } from 'dexie';
import { Injectable } from '@angular/core';
import { Employee } from '../interfaces/employee';

@Injectable({
  providedIn: 'root',
})
export class MyDbService extends Dexie {
  employees!: Table<Employee, string>;

  constructor() {
    super('orchis-hub');
    this.version(1).stores({
      employees: '_id, name', // Indexes: primary key _id, and secondary index on name
    });
  }

  addEmployee(employee: Employee): Promise<string> {
    return this.employees.add(employee);
  }

  getAllEmployees(): Promise<Employee[]> {
    return this.employees.toArray();
  }

  getEmployeeById(id: string): Promise<Employee | undefined> {
    return this.employees.get(id);
  }

  deleteEmployee(id: string): Promise<void> {
    return this.employees.delete(id) as Promise<void>;
  }
}
