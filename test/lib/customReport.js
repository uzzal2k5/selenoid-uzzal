 import wdioAllureReporter from 'wdio-allure-reporter'
 import { Reporter } from '../lib'

 browser.addCommand('reportHeader',
 function (feature, story, severity) {
   const reporterTags = {
     'feature': feature,
     'story': story,
     'severity': severity
   }
   Object.keys(reporterTags).forEach((tagName) => {
     if (!reporterTags[tagName]) throw new Error(`You must include ${tagName} tag in the test report`)
   })
   wdioAllureReporter.feature(reporterTags.feature)
   wdioAllureReporter.story(reporterTags.story)
   wdioAllureReporter.severity(reporterTags.severity)
 })

 browser.addCommand('addTRLabel',
 function (testRailId) {
   if (!testRailId) throw new Error(`You must include testRailId tag in the test report`)
   // testRailId = testRailId.substring(1)
   const TC_ID = testRailId.replace(/\D/g, '')
   const reporterTags = {
     'testRailId': `https://namelyqa.testrail.net/index.php?/cases/view/${TC_ID}`
   }
   wdioAllureReporter.addDescription(testRailId.link(reporterTags.testRailId))
 })

 module.exports = {
   reporter: {
     setHeader: browser.reportHeader,
     step: Reporter.step,
     closeStep: Reporter.closeStep,
     addTRLabel: browser.addTRLabel,
     debug: Reporter.debug,
     error: Reporter.error,
     warning: Reporter.warning
   }
 }
