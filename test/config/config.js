// load env var into this config file
const env = process.env.NODE_ENV || 'development'
const testData = require('./test-data').testData

let testEnv
// Read env variables from this config.
if (env === 'test') {
  const baseURL = browser.options.baseUrl
  const isTestBaseUrlExist = Object.keys(testData).includes(baseURL)

  if (!isTestBaseUrlExist) {
    console.log('*************baseURL Not Found***********')
    throw new Error(`Your baseUrl: ${baseURL} is not valid or not listed in our repo`)
  }

  testEnv = testData[baseURL]
}

module.exports = testEnv
