export default class BasePage {
  get title () { return browser.getTitle() }
  get loading () { return $('img[title="Loading"]') }

  navigate (urlPath) {
    browser.url(urlPath)
    browser.windowHandleFullscreen()
  }

  getPageName () {
    return `${this.constructor.name} -`
  }

  waitForNewTab (initialTabCount) {
    browser.waitUntil(function () {
      return browser.getTabIds().length === (initialTabCount + 1)
    }, 5000, 'expect to have one more tab opened')
  }

  closeTab () {
    browser.window()
    const handles = browser.getTabIds()

    if (handles.length) {
      browser.switchTab(handles[0]).pause(1000)
    }
  }
}
