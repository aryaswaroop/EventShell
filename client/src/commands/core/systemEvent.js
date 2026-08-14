import { getEvent } from '../../api/eventApi'

const EVENT_ID = 'eventshell-demo-001'

const systemEventCommand = {
    name: 'system.event',

    description: 'Show current event',

    execute: async () => {
        const event = await getEvent(EVENT_ID)

        return [
            'CURRENT EVENT',
            '',
            `ID          : ${event.eventId}`,
            `Name        : ${event.name}`,
            `Type        : ${event.type.label}`,
            `Category    : ${event.type.category}`,
            `Status      : ${event.status}`,
        ]
    },
}

export default systemEventCommand