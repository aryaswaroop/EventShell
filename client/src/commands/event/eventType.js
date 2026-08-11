import EVENT_CONFIG from '../../config/eventConfig'

const eventTypeCommand = {
    name: 'event.type',

    description: 'Show event type',

    execute: () => [
        'EVENT TYPE',
        '',
        `Type     : ${EVENT_CONFIG.type.label}`,
        `Category : ${EVENT_CONFIG.type.category}`,
        `ID       : ${EVENT_CONFIG.type.id}`,
    ],
}

export default eventTypeCommand