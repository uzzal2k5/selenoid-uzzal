class Sidebar {
  get sidebar() {
    return $('#home-sidenav');
  }

  get timecard_expenses() {
    return $('a[href="/payroll/timecard_expenses"]');
  }

  get view_benefits() {
    return $('a[href="/payroll/benefits"]');
  }
}

export default new Sidebar();
