const defaultStartValue = {
  year: new Date().getFullYear(),
  month: new Date().getMonth(),
  day: new Date().getDate(),
  hour: new Date().getHours(),
  minutes: new Date().getMinutes(),
}

const defaultEndValue = {
  ...defaultStartValue,
  hour: defaultStartValue.hour + 1,
}

const dateTimeForCalendar = (initial = defaultStartValue, final = defaultEndValue) => {
  if (!verifyDate(initial) || !verifyDate(final)) {
    return null;
  } 

  const formatStartDateObject = formatDateToString(initial);
  const formatFinalDateObject = formatDateToString(final);

  const start = parseDateToString(formatStartDateObject);
  const end = parseDateToString(formatFinalDateObject);

  return { start, end };
}

function formatDateToString(date) {
  const dateToString = { ...date };

  if (date.month < 10) { 
    dateToString.month = `0${date.month}`;
  }

  if (date.day < 10) {
    dateToString.day = `0${date.day}`;
  }

  if (date.hour < 10) {
    dateToString.hour = `0${date.hour}`;
  }
  
  if (date.minutes < 10) {
    dateToString.minutes = `0${date.minutes}`;
  }

  return dateToString;
}

function parseDateToString(date) {
  const { year, month, day, hour, minutes } = date;
  const stringifyDate = `${year}-${month}-${day}T${hour}:${minutes}:00.000Z`;

  return new Date(Date.parse(stringifyDate));
}

function verifyDate(date) {
  const { day, month, year, hour, minutes } = date;

  const validDay = -1 < day && day < 32;
  const validMonth = -1 < month && month < 12;
  const validHour = -1 < hour && hour < 25;
  const validYear = 1899 < year && year < 10000;
  const validMinute = -1 < minutes && minutes < 60;

  return validDay && validMonth && validYear && validHour && validMinute;
}
 
module.exports = {
  dateTimeForCalendar,
  formatDateToString,
  parseDateToString,
}