import { getEvent } from '../../api/eventApi'

const EVENT_ID = 'eventshell-demo-001'

const eventDataCommand = {
    name: 'event.data',

    description: 'Show complete event data',

    execute: async () => {
        const event = await getEvent(EVENT_ID)

        return [
            'EVENT DATA',
            '',
            `ID          : ${event.eventId}`,
            `Name        : ${event.name}`,
            `Type        : ${event.type.label}`,
            `Category    : ${event.type.category}`,
            `Status      : ${event.status}`,
            `Date        : ${event.date}`,
            `Time        : ${event.time}`,
            `Location    : ${event.location}`,
            `Host        : ${event.host}`,
            `Description : ${event.description}`,
        ]
    },
}

export default eventDataCommand