import { Component, inject, OnInit } from '@angular/core';
import { MyDbService } from './services/my-db.service';
import { Employee } from './interfaces/employee';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { faker } from '@faker-js/faker';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'orchis-hub';
  dbService = inject(MyDbService);
  employees: Employee[] | null = null;

  employeeForm = new FormGroup({
    name: new FormControl(''),
  });

  ngOnInit() {
    console.log('Before fetch', this.employees);
    (async () => {
      this.employees = await this.dbService.getAllEmployees();
      console.log('After fetch', this.employees);
    })();
  }

  async addEmployee() {
    const name = this.employeeForm.value.name as string;
    const _id = faker.string.uuid();
    await this.dbService.addEmployee({ _id, name });
    this.employeeForm.reset();
    this.employees = null;
    const newEmployees = await this.dbService.getAllEmployees();
    this.employees = newEmployees;
  }
}
