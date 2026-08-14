import { getEvent } from '../../api/eventApi'

const EVENT_ID = 'eventshell-demo-001'

const eventLocationCommand = {
    name: 'event.location',

    description: 'Show event location',

    execute: async () => {
        const event = await getEvent(EVENT_ID)

        return [
            'EVENT LOCATION',
            '',
            `Location : ${event.location}`,
        ]
    },
}

export default eventLocationCommand