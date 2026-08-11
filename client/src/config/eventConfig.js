import EVENT_TYPES from './eventTypes'

const EVENT_CONFIG = {
    id: 'eventshell-demo-001',

    name: "Arya's Birthday",

    type: EVENT_TYPES.BIRTHDAY,

    status: 'ACTIVE',

    date: '15 August 2026',

    time: '07:00 PM',

    location: 'Giridih, Jharkhand',

    host: 'Arya Swaroop',

    description:
        'A special celebration powered by EventShell.',

    organizer: {
        name: 'Arya Swaroop',
        contact: 'Configuration Required',
    },

    terminal: {
        username: 'admin',
        hostname: 'developerfest',
    },
}

export default EVENT_CONFIG