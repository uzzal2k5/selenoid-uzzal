# Page Object Example

This directory demonstrates a simple setup for a wdio test suite with page objects. There is a page object for each page that gets tested + a parent page (`BasePage.js`) object that contains all important selectors and methods each page object should inherit from.

The goal behind this pattern is to abstract any page information away from the actual tests. Ideally you should store all selectors or specific instructions that are unique for a certain page in a page controller, so that you still can run your test after you've completely redesigned your page and fixed all selectors in the page object.
