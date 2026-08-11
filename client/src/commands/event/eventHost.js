import EVENT_CONFIG from '../../config/eventConfig'

const eventHostCommand = {
    name: 'event.host',

    description: 'Show event host',

    execute: () => [
        'EVENT HOST',
        '',
        `Host : ${EVENT_CONFIG.host}`,
    ],
}

export default eventHostCommand