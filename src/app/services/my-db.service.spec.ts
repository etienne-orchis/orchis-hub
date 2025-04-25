import { TestBed } from '@angular/core/testing';

import { MyDbService } from './my-db.service';
import { Employee } from '../interfaces/employee';

describe('MyDbService', () => {
  let service: MyDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add an employee to the database', async () => {
    try {
      const newEmployee: Employee = { _id: '1', name: 'John Doe' };
      await service.addEmployee(newEmployee);
      const storedEmployee = await service.getEmployeeById('1');
      expect(storedEmployee).toEqual(newEmployee);
    } catch (error) {
      console.log(error);
    }
  });
});
