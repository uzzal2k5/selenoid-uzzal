class TimecardRow {
  constructor(element) {
    this._root = element;
    this.elements = this._root.$$('td');
  }

  get workDate() {
    return this.elements[1];
  }

  get shift() {
    return this.elements[4];
  }

  get job() {
    return this.elements[5].$('select');
  }

  get inHour() {
    return this.elements[6].$('input[type="text"]');
  }

  get inNote() {
    return this.elements[7].$('textarea');
  }

  get outHour() {
    return this.elements[8].$('input[type="text"]');
  }

  get outNote() {
    return this.elements[9].$('textarea');
  }

  get hours() {
    return this.elements[10];
  }

  get dailyTotal() {
    return this.elements[11]
  }

  get weeklyTotal() {
    return this.elements[11]
  }

  get delete() {
    return this._root.$('a[id*="_DeleteButton"]')
  }

  exists() {
    return this._root.isExisting();
  }

  fill(data) {
    this.job.selectByVisibleText(data.job);
    this.inHour.setValue(data.inHour.replace(':', '').replace(' ', ''));
    this.inNote.setValue(data.inNote);
    this.outHour.setValue(data.outHour.replace(':', '').replace(' ', ''));
    this.outNote.setValue(data.outNote);
    this.hours.click()
  }

  deleteRow() {
    if (this.delete.isVisible()) {
      this.delete.click();
      browser.alertAccept();
    } else {
      console.error('Row cannot be deleted, no delete link');
    }
  }
}

class DataGridTable {
  get timecard_table() {
    return $('.DataGridTable');
  }

  getTimecardRow(date) {
    browser.pause(500); // required for table recalculation. Going to update with some 'wait' functionality in future
    return new TimecardRow(this.timecard_table.$(`td=${date}`).$('..'));
  }
}

export default new DataGridTable();
