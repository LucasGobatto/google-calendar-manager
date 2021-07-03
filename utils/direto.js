const {google} = require('googleapis');
const { config }= require('dotenv');
config('config.env');

const credentials = JSON.parse(process.env.CREDENTIALS);
const calendarId = process.env.CALENDAR_ID;

const scopes = ['https://www.googleapis.com/auth/calendar'];
const calendar = google.calendar({ version: 'v3'});

const auth = new google.auth.JWT(
  credentials.client_email,
  null,
  credentials.private_key,
  scopes,
);

const time = 'Z';
const timeZone = '(GMT-03:00) Horário Padrão de Brasília - São Paulo';

const dateTimeForCalendar = () => {
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
  const newDateTime = `${year}-${month}-${day}T${hour}:${minutes}:00.000${time}`;

  const start = new Date(Date.parse(newDateTime));
  const end = new Date(new Date(start).setHours(start.getHours() +1));

  return { start, end };
}

const insertEvent = async (event) => {
  try {
    const response = await calendar.events.insert({
       auth,
       calendarId,
       resource: event,
    });

    return response.status === 200; 
  } catch(err) {
    console.log('insertEvent error -', err);
    return false;
  }
}

const dateTime = dateTimeForCalendar();

const event = {
  summary: 'This is the summary.',
  description: 'This is the description.',
  start: {
    dateTime: dateTime.start,
    timeZone,
  },
  end: {
    dateTime: dateTime.end,
    timeZone,
  }
};

insertEvent(event).then(console.log).catch(console.log)

const getEvent = async (timeMin, timeMax) => {
  try {
    const response = await calendar.events.list({
      auth,
      calendarId,
      timeMin,
      timeMax,
      timeZone,
    });

    return response.data.items;
  } catch(err) {
    console.log('getEvent error -', err);
  }
};

getEvent(dateTime.start, dateTime.end).then(console.log);

const deleteEvent = async (eventId) => {
  try {
    const response = await calendar.events.delete({
      auth,
      calendarId,
      eventId
    });

    return !response.data;
  } catch(err) {
    console.log('deleteEvent error -', err);
  }
}