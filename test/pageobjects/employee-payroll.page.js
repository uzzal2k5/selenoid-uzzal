import BasePage from './base.page'

class EmployeePayrollPage extends BasePage {
  constructor () {
    super()
  }

  get viewCurrentBenefitsLink () {
    return $('a[id$="LinkMyBenefits"]')
  }

  waitForPage () {
    return this.viewCurrentBenefitsLink.waitForVisible()
  }
}

export default new EmployeePayrollPage()
