const {google} = require('googleapis');
const { dateTimeForCalendar } = require('./parse-time');
const { createEvent, timeZone } = require('./event');
const { getUserCredentials } = require('./get-token');

async function app() {
  const auth = await getUserCredentials();

  const calendar = google.calendar({ version: 'v3', auth })

  const eventDateTime = dateTimeForCalendar();

  const event = createEvent(eventDateTime);

  calendar.freebusy.query({
    resource: {
      timeZone,
      timeMin: eventDateTime.start,
      timeMax: eventDateTime.end,
      items: [{ id: 'primary' }], // list of id of calendars that we will verify if it is free or busy
    }
  }, (err, res) => {
    if (err) {
      return console.error('freebusy error -', err);
    }

    const events = res.data.calendars.primary.busy;

    if (events.length) {
      console.log('the calendar is busy')
      return;
    }

    return calendar.events.insert({ calendarId: 'primary', resource: event }, err => {
      if(err) {
        console.error('insertEvent error -', err);
      }
      console.log('event was created!');
      return true;
    })
  })
}  

app()
