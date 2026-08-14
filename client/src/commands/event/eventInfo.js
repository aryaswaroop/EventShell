import { getEvent } from '../../api/eventApi'

const EVENT_ID = 'eventshell-demo-001'

const eventInfoCommand = {
    name: 'event.info',

    description: 'Show event information',

    execute: async () => {
        const event = await getEvent(EVENT_ID)

        return [
            'EVENT INFORMATION',
            '',
            `Name     : ${event.name}`,
            `Type     : ${event.type.label}`,
            `Category : ${event.type.category}`,
            `Status   : ${event.status}`,
            `Host     : ${event.host}`,
        ]
    },
}

export default eventInfoCommand