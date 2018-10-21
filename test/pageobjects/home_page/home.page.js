import BasePage from '../base.page'
import LoginPage from '../login.page'
import TimecardPage from '../timecard_page/timecard.page'
import menuComponent from '../components/menu.component'
import sidebarComponent from '../home_page/sidebar.component'
import EmployeePayrollPage from '../employee-payroll.page'
import { reporter } from '../../lib/customReport'

class HomePage extends BasePage {
  constructor () {
    super()
    this.path = '/'
  }

  navigate () {
    super.navigate(this.path)
  }

  /**
   * define elements
   */

  get menu () { return menuComponent.menu }

  get sidebar () { return sidebarComponent.sidebar }

  get pretendAs () {
    return $('a[href*="/assume/detach_profile"]')
  }

  /**
   * define or overwrite page methods
   */

  waitForPage () {
    reporter.step(`${this.getPageName()} Wait for home page to be visible`)
    return this.sidebar.waitForVisible()
  }

  viewBenefits () {
    const handlesNumber = browser.getTabIds().length

    sidebarComponent.view_benefits.click()

    this.waitForNewTab(handlesNumber)
    const handles = browser.getTabIds()
    browser.switchTab(handles[handlesNumber]).pause(2000)

    return EmployeePayrollPage
  }

  navigateToTimecard () {
    const handlesNumber = browser.getTabIds().length

    sidebarComponent.timecard_expenses.click()

    this.waitForNewTab(handlesNumber)
    const handles = browser.getTabIds()
    browser.switchTab(handles[handlesNumber]).pause(1000)
    return TimecardPage
  }

  logout () {
    reporter.step(`${this.getPageName()} logout from homepage`)
    menuComponent.open()
    menuComponent.logout.click()
    return LoginPage
  }

  stopPretend () {
    this.pretendAs.click()
  }
}

export default new HomePage()
