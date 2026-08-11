import EVENT_CONFIG from '../../config/eventConfig'

const eventInfoCommand = {
    name: 'event.info',

    description: 'Show event information',

    execute: () => [
        'EVENT INFORMATION',
        '',
        `Name     : ${EVENT_CONFIG.name}`,
        `Type     : ${EVENT_CONFIG.type.label}`,
        `Category : ${EVENT_CONFIG.type.category}`,
        `Status   : ${EVENT_CONFIG.status}`,
        `Host     : ${EVENT_CONFIG.host}`,
    ],
}

export default eventInfoCommand