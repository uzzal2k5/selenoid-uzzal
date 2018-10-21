import moment from 'moment';

const d = new Date();
const today = moment().format('MM/DD/YYYY');
const monthBefore = moment(today).subtract(1, 'month').format('MM/DD/YYYY');
const monthAfter = moment(today).add(1, 'month').format('MM/DD/YYYY');

const tomorrow = moment(today).add(1, 'day').format('MM/DD/YYYY');

export const timeoffData = {
  range: 'day',
  date: tomorrow,
  hourType: 'PTO-PT 40 Hours',
  hours: '5.00',
  note: 'Just for testing purposes',
};

export const searchPendingTimeoffData = {
  from: monthBefore,
  to: monthAfter,
  status: 'Pending',
};

export const searchApprovedTimeoffData = {
  from: monthBefore,
  to: monthAfter,
  status: 'Approved',
};

export const searchDeniedTimeoffData = {
  from: monthBefore,
  to: monthAfter,
  status: 'Deleted',
};

export const timecardData = {
  workDate: today,
  job: 'Default Payroll Job',
  inHour: '09:00 AM',
  inNote: 'Test In Note.',
  outHour: '05:00 PM',
  outNote: 'Test Out Note.',
  hours: '8.00',
  dailyTotal: '8.00',
  weeklyTotal: '8.00',
};

export const searchTimecardData = {
  from: today,
  to: today,
};
