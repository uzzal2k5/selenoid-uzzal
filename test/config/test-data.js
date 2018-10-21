require('dotenv').load(); // loads the .env file

exports.testData = {
  'https://sq-lab10.s.namely.com': {
    EMAIL: process.env.TEST_SQLAB10_EMAIL,
    PASSWORD: process.env.TEST_SQLAB10_PASSWORD,
    CLIENT_NAME: process.env.TEST_SQLAB10_CLIENT_NAME,
    PAYROLL_URL: process.env.TEST_SQLAB10_PAYROLL_URL
  },
  'https://sales145.s.namely.com': {
    EMAIL: process.env.TEST_CO04_EMAIL,
    PASSWORD: process.env.TEST_CO04_PASSWORD,
    CLIENT_NAME: process.env.TEST_CO04_CLIENT_NAME
  },
  'https://custos-sandbox.s.namely.com': {
    EMAIL: process.env.WATCHMEN_EMAIL,
    PASSWORD: process.env.WATCHMEN_PASSWORD,
    CLIENT_NAME: process.env.WATCHMEN_CLIENT_NAME
  },
  'https://custos-sandbox.i.namely.com': {
    EMAIL: process.env.WATCHMEN_EMAIL,
    PASSWORD: process.env.WATCHMEN_PASSWORD,
    CLIENT_NAME: process.env.WATCHMEN_CLIENT_NAME
  }
};
