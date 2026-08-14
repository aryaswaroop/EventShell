import { getEvent } from '../../api/eventApi'

const EVENT_ID = 'eventshell-demo-001'

const eventDescriptionCommand = {
    name: 'event.description',

    description: 'Show event description',

    execute: async () => {
        const event = await getEvent(EVENT_ID)

        return [
            'EVENT DESCRIPTION',
            '',
            event.description,
        ]
    },
}

export default eventDescriptionCommand