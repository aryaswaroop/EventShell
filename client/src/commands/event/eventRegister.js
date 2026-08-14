import { getEvent } from '../../api/eventApi'

const EVENT_ID = 'eventshell-demo-001'

const eventRegisterCommand = {
    name: 'event.register',

    description: 'Register for the event',

    execute: async () => {
        const event = await getEvent(EVENT_ID)

        const registration = event.registration

        if (!registration?.enabled) {
            return [
                'EVENT REGISTRATION',
                '',
                'Registration is currently unavailable.',
                '',
                `Status  : ${registration?.status || 'NOT_AVAILABLE'}`,
                registration?.message
                    ? `Message : ${registration.message}`
                    : '',
            ].filter(Boolean)
        }

        if (registration.status !== 'OPEN') {
            return [
                'EVENT REGISTRATION',
                '',
                `Registration is ${registration.status.toLowerCase()}.`,
                '',
                registration.message || 'Registration is currently unavailable.',
            ]
        }

        return [
            'EVENT REGISTRATION',
            '',
            'Registration is open for this event.',
            '',
            `Event  : ${event.name}`,
            `Date   : ${event.date}`,
            `Time   : ${event.time}`,
            '',
            'Registration form will be available here.',
        ]
    },
}

export default eventRegisterCommand