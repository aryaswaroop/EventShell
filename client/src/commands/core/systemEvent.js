import EVENT_CONFIG from '../../config/eventConfig'

const systemEventCommand = {
    name: 'system.event',

    description: 'Show current event',

    execute: () => [
        'CURRENT EVENT',
        '',
        `ID          : ${EVENT_CONFIG.id}`,
        `Name        : ${EVENT_CONFIG.name}`,
        `Type        : ${EVENT_CONFIG.type.label}`,
        `Category    : ${EVENT_CONFIG.type.category}`,
        `Status      : ${EVENT_CONFIG.status}`,
    ],
}

export default systemEventCommand