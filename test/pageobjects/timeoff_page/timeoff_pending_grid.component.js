class TimeoffRow {
  constructor(element) {
    this._root = element;
    this.elements = this._root.$$('td');
  }

  get edit() {
    return this._root.$('a[id*="_EditLink"');
  }

  get withdraw() {
    return this._root.$('a[id*="_DeleteLink"');
  }

  get id() {
    return this.elements[2];
  }

  get status() {
    return this.elements[3];
  }

  get date() {
    return this.elements[4];
  }

  get day() {
    return this.elements[5];
  }

  get hourType() {
    return this.elements[6];
  }

  get hours() {
    return this.elements[7];
  }

  get note() {
    return this.elements[8];
  }

  withdrawRequest() {
    this.withdraw.click();
  }

  editRequest() {
    this.edit.click();
  }

  exists() {
    return this._root.isExisting();
  }
}

class TimeoffPendingTable {
  get timeoffTable() {
    return $('table[id*="_EmployeeTimeOffGrid"]');
  }

  getTimeoffRow(date) {
    browser.pause(500); // required for table recalculation. Going to update with some 'wait' functionality in future
    return new TimeoffRow(this.timeoffTable.$(`td=${date}`).$('..'));
  }

  validateStatuses(statuses) {
    if (!this.timeoffTable.isExisting()) {
      return true
    }
    const allRowsLocators = this.timeoffTable.$$('tr').slice(1, -1);

    for (let elem of allRowsLocators) {
      let row = new TimeoffRow(elem);
      if (!statuses.includes(row.status.getText())) {
        console.warn(`Row ${row._root.getText()} has a wrong status. Expected statuses: ${statuses}`);
        return false
      }
    }
    return true
  }
}

export default new TimeoffPendingTable();
