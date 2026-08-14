import { getEvent } from '../../api/eventApi'

const EVENT_ID = 'eventshell-demo-001'

const eventDateCommand = {
    name: 'event.date',

    description: 'Show event date',

    execute: async () => {
        const event = await getEvent(EVENT_ID)

        return [
            'EVENT DATE',
            '',
            `Date : ${event.date}`,
            `Time : ${event.time}`,
        ]
    },
}

export default eventDateCommand