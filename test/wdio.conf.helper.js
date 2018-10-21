
  // const browser = process.env.BROWSER
const WDIO_BROWSER_NAME = process.env.WDIO_BROWSER_NAME
const debug = process.env.DEBUG
const defaultTimeoutInterval = 100000

let maxInstance = debug ? 1 : 10
let capability = debug ? [{browserName: 'chrome'}] : null
let timeoutInterval = debug ? (24 * 60 * 60 * 1000) : defaultTimeoutInterval

if (WDIO_BROWSER_NAME) {
  maxInstance = 2
  switch (WDIO_BROWSER_NAME) {
    case 'chrome':
      capability = [{browserName: 'chrome'}]
      break
    case 'firefox':
      capability = [{browserName: 'firefox'}]
      break
  }
}

module.exports = {
  maxInstance,
  capability,
  timeoutInterval
}
