const timeZone = '(GMT-03:00) Horário Padrão de Brasília - São Paulo';

const createEvent = (dateTime) => {
  return {
    summary: 'This is the summary.',
    description: 'This is the description.',
    start: {
      dateTime: dateTime.start,
      timeZone,
    },
    end: {
      dateTime: dateTime.end,
      timeZone,
    },
    localization: null,
    colorId: 1, // 11 differents colors on readme in github
  };;
}

module.exports = {
  createEvent,
  timeZone,
}