import BasePage from '../base.page';

class EmployeePage extends BasePage {
  get viewAs() {
    return $('a[href*="/attach_profile"]');
  }

  pretendAs() {
    if (this.viewAs.isVisible()) {
      this.viewAs.click();
    } else {
      console.info('Already viewing as user');
    }
  }
}

export default new EmployeePage();
