import BasePage      from '../base.page';
import Menu          from '../components/menu.component';
import EmployeeTable from '../people_page/employee_table.component';
import EmployeePage  from '../employee_page/employee.page';

class PeoplePage extends BasePage {
  constructor() {
    super();
    this.url = 'people';
  }

  /**
   * define elements
   */

  get searchField() {
    return $('#employee-filter-search');
  }

  get employeeTable() {
    return EmployeeTable.employeeTable;
  }

  get menu() {
    return Menu.menu;
  }

  /**
   * define or overwrite page methods
   */

  waitForPage() {
    return this.searchField.waitForVisible();
  }

  navigate() {
    super.navigate(this.url);
  }

  searchForEmployee(name) {
    this.searchField.waitForVisible();
    this.searchField.setValue(name);
    browser.pause(500);
  }

  chooseEmployee(fullName) {
    const tableRow = EmployeeTable.getEmployeeRow(fullName);
    tableRow.chooseEmployee();
    return EmployeePage;
  }
}

export default new PeoplePage();
