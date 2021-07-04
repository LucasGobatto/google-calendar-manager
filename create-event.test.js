const { expect } = require('chai');

describe('E2E - Create Event', () => {})

describe('Unit - Parse Date to String', () => {
  const { formatDateToString, parseDateToString, dateTimeForCalendar } = require('./parse-time');
  const fakeStringifyDate = '2021-07-04T03:59:00.000Z';
  const fakeParsedDate = '2021-07-04T00:59:00.000Z';
  const fakeDate = new Date(fakeStringifyDate)
  const defaultDate = {
    year: fakeDate.getFullYear(),
    month: fakeDate.getMonth(),
    day: fakeDate.getDate(),
    hour: fakeDate.getHours(),
    minutes: fakeDate.getMinutes(),
  }
  
  it('should map date correctly', () => {
    const expected = {
      year: 2021,
      month: '06',
      day: '04',
      hour: '00',
      minutes: 59,
    }

    const response = formatDateToString(defaultDate);

    expect(response).to.be.deep.eq(expected)
  })

  it('should parse object to string', () => {
    const date = {
      year: 2021,
      month: '07',
      day: '04',
      hour: '00',
      minutes: 59,
    }
    const expected = new Date(Date.parse(fakeParsedDate))

    const response = parseDateToString(date);

    expect(response).to.be.deep.eq(expected)
  })

  it('should get invalid date and return null', () => {
    const dateWithWrongDay = {...defaultDate, day: -1};
    const dateWithWrongMonth = {...defaultDate, month: 12};
    const dateWithWrongYear = {...defaultDate, year: 1899};
    const dateWithWrongHour = {...defaultDate, year: 25};
    const dateWithWrongMinutes = {...defaultDate, minutes: 60};

    const responseWithWrongDay = dateTimeForCalendar(dateWithWrongDay)
    const responseWithWrongMonth = dateTimeForCalendar(dateWithWrongMonth)
    const responseWithWrongYear = dateTimeForCalendar(dateWithWrongYear)
    const responseWithWrongHour = dateTimeForCalendar(dateWithWrongHour)
    const responseWithWrongMinutes = dateTimeForCalendar(dateWithWrongMinutes)

    expect(responseWithWrongDay).to.be.null;
    expect(responseWithWrongMonth).to.be.null;
    expect(responseWithWrongYear).to.be.null;
    expect(responseWithWrongHour).to.be.null;
    expect(responseWithWrongMinutes).to.be.null;
  })
})