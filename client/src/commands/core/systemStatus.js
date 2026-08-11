import SYSTEM_CONFIG from '../../config/systemConfig'

const systemStatusCommand = {
    name: 'system.status',

    description: 'Show system status',

    execute: () => [
        'SYSTEM STATUS',
        '',
        `Terminal     : ${SYSTEM_CONFIG.terminal}`,
        `Event Engine : ${SYSTEM_CONFIG.engine}`,
        `Event Data   : ${SYSTEM_CONFIG.eventData}`,
        `Command API  : ${SYSTEM_CONFIG.commandAPI}`,
        `Environment  : ${SYSTEM_CONFIG.environment}`,
        `Status       : ${SYSTEM_CONFIG.status}`,
    ],
}

export default systemStatusCommand