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

const dateTimeForCalendar = (inital = defaultStartValue, final = defaultEndValue) => {
  const time = '';

  const date = { now: new Date() };

  date.year = date.now.getFullYear();
  date.month = date.now.getMonth() + 1;
  date.day = date.now.getDate();
  date.hour = date.now.getHours();
  date.minutes = date.now.getMinutes();

  if (date.month < 10) { 
    date.month = `0${date.month}`;
  }

  if (date.day < 10) {
    date.day = `0${date.day}`;
  }

  if (date.hour < 10) {
    date.hour = `0${date.hour}`;
  }
  
  if (date.minutes < 10) {
    date.minutes = `0${date.minutes}`;
  }

  const { year, month, day, hour, minutes } = date;
  const newDateTime = `${year}-${month}-${day}T${hour}:${minutes}:00.000${time}`

  const start = new Date(Date.parse(newDateTime));
  const end = new Date(new Date(start).setHours(start.getHours() +1));

  return { start, end }
}

module.exports = {
  dateTimeForCalendar
}