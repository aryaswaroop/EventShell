import EVENT_CONFIG from '../../config/eventConfig'

const eventLocationCommand = {
  name: 'event.location',

  description: 'Show event location',

  execute: () => [
    'EVENT LOCATION',
    '',
    `Location : ${EVENT_CONFIG.location}`,
  ],
}

export default eventLocationCommand