import reporter from 'wdio-allure-reporter'
import LoginPage from '../../pageobjects/login.page'
import HomePage from '../../pageobjects/home_page/home.page'
import EmplyeePayrollPage from '../../pageobjects/employee-payroll.page'

const env = require('../../config/config')

describe('Login', () => {
  beforeEach(() => {
    reporter.feature('Benefit Features')
    reporter.story('This story tests viewing and changing benefits')

    LoginPage.navigate()
    LoginPage.waitForPage()
  })
  afterEach(() => {
    if (HomePage.menu.isVisible()) {
      HomePage.logout()
    }
  })

  describe('Clicking View Benefits', () => {
    it('should direct you to Payroll', () => {
      const home_page = LoginPage.login(env.EMAIL, env.PASSWORD)
      home_page.waitForPage()

      const employee_payroll_page = home_page.viewBenefits()
      employee_payroll_page.waitForPage()

      expect(employee_payroll_page.title).toEqual('NamelyPayroll.com') // jasmine example
    })
  })
})
