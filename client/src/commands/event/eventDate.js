import EVENT_DATA from '../../config/eventData'

const eventDateCommand = {
  name: 'event.date',

  description: 'Show event date',

  execute: () => [
    'EVENT DATE',
    '',
    `Date : ${EVENT_DATA.date}`,
    `Time : ${EVENT_DATA.time}`,
  ],
}

export default eventDateCommand