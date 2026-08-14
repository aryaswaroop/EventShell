import { getEvent } from '../../api/eventApi'

const EVENT_ID = 'eventshell-demo-001'

const eventTypeCommand = {
    name: 'event.type',

    description: 'Show event type',

    execute: async () => {
        const event = await getEvent(EVENT_ID)

        return [
            'EVENT TYPE',
            '',
            `Type     : ${event.type.label}`,
            `Category : ${event.type.category}`,
        ]
    },
}

export default eventTypeCommand