import { reporter } from '../lib/customReport'
import BasePage from './base.page'
import homePage from './home_page/home.page'
import peoplePage from './people_page/people.page'

class LoginPage extends BasePage {
  constructor () {
    super()
    this.urlPath = 'users/login'
  }

  /**
   * define elements
   */

  get loginErrorMsg () { return $('p.message.alert') }
  get username () { return $('#user_email') }
  get password () { return $('#user_password') }
  get submitButton () { return $('.to-login') }

  /**
   * define or overwrite page methods
   */

  waitForPage () {
    reporter.step(`${this.getPageName()} Wait for submit button to be visible`)
    return this.submitButton.waitForVisible()
  }

  navigate () {
    super.navigate(this.urlPath) // this will append `login` to the baseUrl to form complete URL
    reporter.step(`${this.getPageName()} Navigate to ${browser.getUrl()}`)
  }

  submit () {
    reporter.step(`${this.getPageName()} Click submit button`)
    this.submitButton.click()
  }

  verifyLoginErrorMsg () {
    reporter.step(`${this.getPageName()} Get Error message on login`)
    return this.loginErrorMsg.getText()
  }

  login (username, password) {
    reporter.step(`${this.getPageName()} Set username`)
    this.username.setValue(username)
    reporter.step(`${this.getPageName()} Set password`)
    this.password.setValue(password)
    this.submit()
    return homePage
  }

  loginAsEmployee (admin, user) {
    this.login(admin.email, admin.password)

    peoplePage.navigate()
    peoplePage.searchForEmployee(user.first_name)
    const employeePage = peoplePage.chooseEmployee(`${user.first_name} ${user.last_name}`)
    employeePage.pretendAs()
    homePage.navigate()
    return homePage
  }
}

export default new LoginPage()
