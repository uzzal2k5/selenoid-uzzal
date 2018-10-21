The examples works without any 3rd party dependencies for assertions. These can be added if desired to make the test even more readable. The code is written using [JavaScript classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes). In order to be able to run the code make sure you run a Node.JS and npm version that supports it or integrate [Babel](https://babeljs.io/) as compiler.

Node Version: 8.12.0
NPM Version: 6.4.1

## NPM Scripts

To install all dependencies:`npm install`

**Note:** All pretest and cleanup scripts are run before start of any test

To install all dependencies: `npm install`

To run all test locally: `npm test`

To run test using different wdio config file: `$ npm run [name of the config file]`

To run test with different baseUrl: `npm run test -- --baseUrl=https:/exmaple/path`

To run specific suite of test: `npm run test-suites [suiteName]`

To run single test: `npm run single-test [path of single test]`

To run test in watch mode: `npm run test-watch-mode`

## Docker

To run test in docker containers(chrome/firefox): `npm run test-docker`

To run test in docker container(chrome only): `npm run test-docker-chrome`

To run test in docker container(firefox only): `npm run test-docker-firefox`

## Reporting

To generate allure reports: `npm run allure-report`

To generate junit reports: `npm run junit-report`

To generate mochawesome-report reports: `npm run mochawesome-report`

### Debug

To run tests in debug mode: `npm run test-debug`

Use `browser.debug()` in the test. This will pass the `DEBUG=true` flag to config to halt browser for longer period, and also enable REPL mode for us to inspect anything in the command.

To run tests in debug mode with multiple parameters: `npm run test-debug -- --suite login`

### Wdio-docker-service

Selenium Docker: Testing public sites

#### Use Case:

As a developer I would like to run functional tests against my public site and use docker-selenium as my testing environment.

**Test process flow explained**

wdio-docker-service will start a Selenium Docker image of your choice (ex. selenium/standalone-chrome).
Once service is running (normally on port 4444), tests will run (inside a container).
Once tests are finished wdio will report back results.

Here it is instantiating one standalone-chrome service and test will run inside the same container

```
services: ['docker'],
dockerLogs: './',
dockerOptions: {
    image: 'selenium/standalone-chrome',
    healthCheck: 'http://localhost:4444',
    options: {
        p: ['4444:4444'],
        shmSize: '2g'
    }
}
```

When we want to dockerized our application with wdio docker service

#### Use Case

As a developer I want to run functional tests against my application which runs inside a Docker container.

**How is this different from other scenarios?**
In previous scenarios such as Selenium Docker: Testing local applications we demonstrated how Docker is used to run Selenium standalone service, where this example demonstrates how to run Docker to host your application. These scenarios are radically different since roles of Docker are reversed.

**Test process flow explained**
`wdio-docker-service` will start your dockerized application. Once your application is running, tests will run in any other service available for WDIO (i.e. `wdio-selenium-standalone-service`). Once tests are finished `wdio` will report back results.

```
services: [
     'selenium-standalone',
     'docker'
 ],
 dockerLogs: './',
 dockerOptions: {
     image: 'node:8',
     healthCheck: 'http://localhost:4444',
     options: {
         p: ['4444:4444'],
         shmSize: '2g'
     }
 }
```

## Our Git Strategy

### Branching & Branch Naming

We branch off `master` and create feature branches for our work.

The branch name should include the Jira ID (e.g. TESTENG-261) and descriptive title to trigger the Jira/Github integration. This way the PR automatically appears in the Jira ticket, e.g. `TESTENG-999/update-docs`.

### Adding Tests

If tests are being committed, tests should be run locally 500 times. If the test fails more than 5 times (1% failure rate), the test should be rewritten or the the issues causing the errors should be investigated and fixed. Regardless, attach a screenshot of the results from your console in your PR.

### Commit Messages

A repo represents a single source of truth, and the commits and the commit messages are the history of what has been done.

A good commit message should:

- Say why this change is necessary
- How the change address the issue
- Any potential side effects from this change

Do not include commit messages like "fixed spacing", "WIP, " or "address CR comments".

### Pull Requests & Code Review

Pull Requests (PR) initiate discussion about your commits. Anyone can see exactly what changes would be merged if they accept your request.

The PR should include the Jira ID and a descriptive title for cross-reference between Jira and Github, e.g. TESTENG-999 | Initial draft of Python (Pytest) POC with API and UI. If you're still working on some features, add WIP on the end.

All branches require at least one code review before the change can be merged into develop. Comments must be addressed.

When code review is complete, the reviewers should gitmark the PR as ready to merge.

### Deploy & Merging

When the PR is ready to merge, please make sure `Squash and merge` is selected, and merge your changes.

If your branch causes issues, you can roll it back.

Be sure to delete your branch when you're done. It helps keep the repo tidy.

## Style Guide

If contributing documentation to our repo, please follow our guidelines.

All files and folders should be in a camel case if more than one word.

Ex. `goodFileName` or `loginError.test.js`.

Code should be monospace. That's achieved through using backticks (`) around the word you want to monospace.

If you're pasting large chunks of code, please use syntax highlighting by using triple backticks with the name of the language after the first set of backticks (```javascript) before and after the code block. This will highlight the syntax properly, e.g."

\`\`\`javascript
function myFunction() { // Declare a function
document.getElementById("demo").innerHTML = "Hello World!";
}
\`\`\`

becomes

```javascript
function myFunction() {
  // Declare a function
  document.getElementById("demo").innerHTML = "Hello World!";
}
```

For more information on GitHub flavored markdown, click [here](https://help.github.com/categories/writing-on-github/).
