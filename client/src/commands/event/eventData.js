import EVENT_DATA from '../../config/eventData'

const eventDataCommand = {
    name: 'event.data',

    description: 'Show complete event data',

    execute: () => [
        'EVENT DATA',
        '',
        `ID          : ${EVENT_DATA.id}`,
        `Name        : ${EVENT_DATA.name}`,
        `Type        : ${EVENT_DATA.type.label}`,
        `Category    : ${EVENT_DATA.type.category}`,
        `Status      : ${EVENT_DATA.status}`,
        `Date        : ${EVENT_DATA.date}`,
        `Time        : ${EVENT_DATA.time}`,
        `Location    : ${EVENT_DATA.location}`,
        `Host        : ${EVENT_DATA.host}`,
        `Description : ${EVENT_DATA.description}`,
    ],
}

export default eventDataCommand