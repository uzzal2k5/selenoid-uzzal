import PayrollPage         from '../payroll.page';
import TimeoffPendingTable from './timeoff_pending_grid.component';
import TimeoffDeletedTable from './timeoff_deleted_grid.component';
import RequestTimeoff      from './request_timeoff.component';

class TimeoffPage extends PayrollPage {
  constructor() {
    super();
    this.path = 'TimeCard/TC1/TimeOffRequest.aspx';
  }

  get requestTimeoffBtn() {
    return $('input[value="Request Time Off"]');
  }

  get requestTimeoffForm() {
    return RequestTimeoff.requestTimeoffForm;
  }

  get dateFrom() {
    return $('input[id*="_DateFromTextBox"]');
  }

  get dateTo() {
    return $('input[id*="_DateToTextBox"]');
  }

  get note() {
    return $('input[id*="_NoteTextbox"]');
  }

  get pending() {
    return $('input[value="Pending"]');
  }

  get approved() {
    return $('input[value="Approved"]');
  }

  get denied() {
    return $('input[value="Denied"]');
  }

  get search() {
    return $('input[value="Search"]');
  }

  navigate() {
    super.navigate(this.path);
  }

  waitForPage() {
    return this.requestTimeoffBtn.waitForVisible();
  }

  requestTimeoff(data) {
    this.requestTimeoffBtn.click();
    RequestTimeoff.singleDay.waitForExist(2000);
    RequestTimeoff.fill(data);
  }

  searchForTimeoff(searchOptions) {
    if (searchOptions.from) {
      browser.pause(500);  // stabilization pause
      this.dateFrom.setValue(searchOptions.from);
      this.note.click();
    }
    if (searchOptions.to) {
      this.dateTo.setValue(searchOptions.to);
      this.note.click();
    }

    let timeoffTable = {};

    switch (searchOptions.status) {
      case 'Pending': {
        this.pending.click();
        timeoffTable = TimeoffPendingTable;
        break;
      }
      case 'Approved': {
        this.approved.click();
        timeoffTable = TimeoffPendingTable;
        break;
      }
      case 'Deleted': {
        this.denied.click();
        timeoffTable = TimeoffDeletedTable;
        break;
      }
      default:
        console.error(`Incorrect search data: option "${searchOptions.status}" is not supported`)
    }

    this.search.click();

    this.loading.waitForVisible(3000, true);
    return timeoffTable;
  }
}

export default new TimeoffPage();
