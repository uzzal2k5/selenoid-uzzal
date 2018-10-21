import assert from 'assert'
import BasePage from './base.page'

class ProfilePage extends BasePage {
  constructor () {
    super()
    this.url = 'profile'
  }

    /**
     * define elements
     */

  get pageHeading () {
    return $('.sidenav-title')
  }

  navigate () {
    super.navigate(this.url)
  }
}

export default new ProfilePage()
