import EVENT_CONFIG from '../../config/eventConfig'

const eventDescriptionCommand = {
    name: 'event.description',

    description: 'Show event description',

    execute: () => [
        'EVENT DESCRIPTION',
        '',
        EVENT_CONFIG.description,
    ],
}

export default eventDescriptionCommand