// import reporter from 'wdio-allure-reporter'

import LoginPage from '../../pageobjects/login.page'
import HomePage from '../../pageobjects/home_page/home.page'
import { reporter } from '../../lib/customReport'
const env = require('../../config/config')

describe('Login', () => {
  beforeEach(() => {})
  afterEach(() => {
    if (HomePage.menu.isVisible()) {
      HomePage.logout()
    }
  })

  describe('with valid credentials ', () => {
    it('should allow access with correct creds', () => {
      reporter.setHeader('Login feature', 'This is a login test with valid creds', 'Blocker')
      // Need to change this TC Id
      reporter.addTRLabel('TC - C144705')
      LoginPage.navigate()
      LoginPage.waitForPage()
      const home_page = LoginPage.login(env.EMAIL, env.PASSWORD)
      // browser.debug()
      home_page.waitForPage()
      expect(home_page.title).toContain(`${env.CLIENT_NAME}`) // jasmine example
    })
  })

  describe('with invalid credentials ', () => {
    it('should not allow access with incorrect creds', () => {
      reporter.setHeader('Login feature', 'This is a login test with invalid creds', 'Blocker')
      // Need to change this TC Id
      reporter.addTRLabel('TC - C144705')
      LoginPage.navigate()
      LoginPage.waitForPage()
      LoginPage.login('invalidEmail@sample.com', env.PASSWORD)
      // browser.debug()
      expect(LoginPage.verifyLoginErrorMsg()).toEqual('You have entered an invalid email or password.')
    })
  })

  describe('Logout @HomePage ', () => {
    it('should get you back to Login', () => {
      reporter.setHeader('Logout feature', 'This is a logout test', 'Blocker')
      // Need to change this TC Id
      reporter.addTRLabel('TC - C144705')
      LoginPage.navigate()
      LoginPage.waitForPage()
      const home_page = LoginPage.login(env.EMAIL, env.PASSWORD)
      home_page.waitForPage()
      // reporter.closeStep()
      const login_page = home_page.logout()
      expect(login_page.title).toEqual(`Sign in : ${env.CLIENT_NAME} on Namely`)
    })
  })
})
