import EmployeePage from '../employee_page/employee.page';

class EmployeeRow {
  constructor(element) {
    this._root = element;
  }

  get name() {
    return this._root.$('.name');
  }

  get title() {
    return this._root.$('.title');
  }

  get location() {
    return this._root.$('.location');
  }

  chooseEmployee() {
    this.name.click();

    return EmployeePage;
  }
}

class EmployeeTable {
  get employeeTable() {
    return $('#employees_list');
  }

  getEmployeeRow(full_name) {
    return new EmployeeRow(
      this.employeeTable
        .$(`=${full_name}`)
        .$('..')
        .$('..'),
    );
  }
}

export default new EmployeeTable();
