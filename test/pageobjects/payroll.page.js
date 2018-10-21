import BasePage from './base.page';
import * as url from 'url';

const env = require('../config/config');

export default class PayrollPage extends BasePage {
  constructor() {
    super();
    this.base_url = env.PAYROLL_URL;
  }

  navigate(path) {
    const newUrl = url.resolve(this.base_url, path);
    browser.url(newUrl);
  }
}
