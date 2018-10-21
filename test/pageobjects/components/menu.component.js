class Menu {
  get menu() {
    return $('#account-menu');
  }

  get settings() {
    return this.menu.$('a[href="/settings/account"]');
  }

  get logout() {
    return this.menu.$('#logout');
  }

  open() {
    this.menu.click();
    this.logout.waitForVisible();
  }
}

export default new Menu();
