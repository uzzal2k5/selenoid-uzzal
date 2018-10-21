import reporter                                    from 'wdio-allure-reporter';
import loginPage                                   from '../../pageobjects/login.page';
import homePage                                    from '../../pageobjects/home_page/home.page';
import timeoffPage
                                                   from '../../pageobjects/timeoff_page/timeoff.page';
import {employee, employee_manager, administrator} from '../../entities/employee/employee';
import {
  timeoffData,
  searchPendingTimeoffData,
  searchApprovedTimeoffData,
  searchDeniedTimeoffData,
  timecardData,
  searchTimecardData
}                                                  from '../../entities/timeSchedule/timeSchedule';

const env = require('../../config/config');

describe('Payroll smoke', () => {
  beforeEach(() => {
    reporter.feature('Payroll smoke tests');
    reporter.story('This story tests that basic Payroll functionality works correctly ');
  });
  afterEach(() => {
    if (homePage.menu.isVisible()) {
      homePage.stopPretend();
      homePage.logout()
    }
  });

  describe('Validates that ', () => {
    beforeEach(() => {
      loginPage.navigate();
      loginPage.waitForPage();

      loginPage.loginAsEmployee(administrator, employee);
      homePage.waitForPage()
    });

    it('an Employee can request time off on the TimeOffRequest page', () => {
      reporter.severity('critical');

      const timecard_page = homePage.navigateToTimecard();
      timecard_page.waitForPage();
      expect(timecard_page.title).toEqual('NamelyPayroll.com');

      timecard_page.navigateToTimeoff();

      timeoffPage.requestTimeoff(timeoffData);
      timeoffPage.waitForPage();

      const searchResult = timeoffPage.searchForTimeoff(searchPendingTimeoffData);

      expect(searchResult.timeoffTable.waitForVisible()).toBe(true);

      const expectedRow = searchResult.getTimeoffRow(timeoffData.date);

      expect(expectedRow.exists()).toBe(true);
      expect(expectedRow.date.getText()).toEqual(timeoffData.date);
      expect(expectedRow.hourType.getText()).toEqual(timeoffData.hourType);
      expect(expectedRow.hours.getText()).toEqual(timeoffData.hours);
      expect(expectedRow.note.getText()).toEqual(timeoffData.note);

      expectedRow.withdrawRequest();
    });

    it('an Employee can create a Time Card on the TimeCard page.', () => {
      reporter.severity('critical');

      const timecardPage = homePage.navigateToTimecard();
      timecardPage.waitForPage();
      expect(timecardPage.title).toEqual('NamelyPayroll.com');

      timecardPage.toggleToGridView();
      expect(timecardPage.timecardTable.waitForVisible()).toBe(true);

      timecardPage.filterByDateRange(searchTimecardData.from, searchTimecardData.to);
      timecardPage.timecardTable.waitForVisible();

      const rowToday = timecardPage.getTimeshiftByDate(timecardData.workDate);
      rowToday.fill(timecardData);
      timecardPage.saveChanges();

      const actualRow = timecardPage.getTimeshiftByDate(timecardData.workDate);

      expect(actualRow.job.getText()).toContain(timecardData.job);
      expect(actualRow.inHour.getAttribute('value')).toEqual(timecardData.inHour);
      expect(actualRow.inNote.getText()).toEqual(timecardData.inNote);
      expect(actualRow.outHour.getAttribute('value')).toEqual(timecardData.outHour);
      expect(actualRow.outNote.getText()).toEqual(timecardData.outNote);
      expect(actualRow.hours.getText()).toEqual(timecardData.hours);
      expect(actualRow.dailyTotal.getText()).toEqual(timecardData.dailyTotal);
      expect(actualRow.weeklyTotal.getText()).toEqual(timecardData.weeklyTotal);

      actualRow.deleteRow();
    });

    it('TimeOffRequest page\'s searches by status correctly', () => {
      reporter.severity('critical');

      const timecard_page = homePage.navigateToTimecard();
      timecard_page.waitForPage();
      expect(timecard_page.title).toEqual('NamelyPayroll.com');

      timecard_page.navigateToTimeoff();

      timeoffPage.requestTimeoff(timeoffData);
      timeoffPage.waitForPage();

      const searchResultPending = timeoffPage.searchForTimeoff(searchPendingTimeoffData);
      expect(searchResultPending.timeoffTable.waitForVisible()).toBe(true);

      expect(searchResultPending.validateStatuses([searchPendingTimeoffData.status])).toBe(true);

      const expectedRow = searchResultPending.getTimeoffRow(timeoffData.date);
      expectedRow.withdrawRequest();

      const searchResultDeleted = timeoffPage.searchForTimeoff(searchDeniedTimeoffData);

      expect(searchResultDeleted.validateStatuses([searchDeniedTimeoffData.status])).toBe(true);

      const searchResultApproved = timeoffPage.searchForTimeoff(searchApprovedTimeoffData);
      expect(searchResultApproved.validateStatuses([searchApprovedTimeoffData.status])).toBe(true);
    });

    afterEach(() => {
      timeoffPage.closeTab();
    });
  });
});
