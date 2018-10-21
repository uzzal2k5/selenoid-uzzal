class RequestTimeoff {
  get requestTimeoffForm() {
    const tables = $$('.DataSingleTable');
    return tables[tables.length - 1];
  }

  get save() {
    return this.requestTimeoffForm.$('input[value="Save"]');
  }

  get cancel() {
    return this.requestTimeoffForm.$('input[value="Cancel"]');
  }

  get singleDay() {
    return $('input[value="Day"]');
  }

  get dateRange() {
    return $('input[value="Date"]');
  }

  get date() {
    return this.requestTimeoffForm.$$('.DataSingleItem')[2].$('input');
  }

  get hourType() {
    return this.requestTimeoffForm.$('select');
  }

  get hours() {
    return this.requestTimeoffForm.$$('.DataSingleItem')[4].$('input');
  }

  get note() {
    return this.requestTimeoffForm.$$('.DataSingleItem')[5].$('textarea');
  }

  get statusLabel() {
    return this.requestTimeoffForm.$('.RecStatus');
  }

  fill(data) {
    // TODO: eliminate 'magic strings'
    if (data.range == 'range') {
      this.dateRange.click();
    } else {
      this.singleDay.click();
      this.date.setValue(data.date);
      this.statusLabel.click(); // to close pop-up calendar
      this.hourType.selectByVisibleText(data.hourType);
      this.hours.setValue(data.hours);
      this.note.setValue(data.note);
    }

    this.save.click();
  }
}

export default new RequestTimeoff();
