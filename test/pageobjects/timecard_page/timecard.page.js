import PayrollPage   from '../payroll.page';
import DataGridTable from '../timecard_page/data_grid.component';

class TimecardPage extends PayrollPage {
  constructor() {
    super();
    this.path = 'TimeCard/TC1/TimeCardManualPunch.aspx';
  }

  get requestTimeoffLink() {
    return $('a[href$="TimeOffRequest.aspx"]')
  }

  get dataEntry() {
    return $('input[value="Grid"]')
  }

  get dateRange() {
    return $('input[value="DateRange"]')
  }

  get startDate() {
    return $('input[id*="_StartDate"]')
  }

  get endDate() {
    return $('input[id*="_EndDate"]')
  }

  get find() {
    return $('a[id*="_btnFind"]')
  }

  get save() {
    return $('input[value="Save Changes"]')
  }

  get timecardTable() {
    return DataGridTable.timecard_table;
  }

  navigate() {
    super.navigate(this.path);
  }

  waitForPage() {
    return this.dataEntry.waitForVisible();
  }

  navigateToTimeoff() {
    this.requestTimeoffLink.click()
  }

  toggleToGridView() {
    this.dataEntry.click();
  }

  filterByDateRange(fromDate, toDate) {
    this.dateRange.click();

    this.startDate.waitForEnabled();

    this.startDate.setValue(fromDate);
    this.endDate.setValue(toDate);

    this.find.click();

    this.loading.waitForVisible(10000, true)
  }

  getTimeshiftByDate(date) {
    return DataGridTable.getTimecardRow(date);
  }

  saveChanges() {
    this.save.click()
  }
}

export default new TimecardPage();
