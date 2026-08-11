import SYSTEM_CONFIG from '../../config/systemConfig'
import EVENT_CONFIG from '../../config/eventConfig'

const systemInfoCommand = {
    name: 'system.info',

    description: 'Show system information',

    execute: () => [
        'SYSTEM INFORMATION',
        '',
        `Engine       : ${SYSTEM_CONFIG.name}`,
        `Version      : ${SYSTEM_CONFIG.version}`,
        `Environment  : ${SYSTEM_CONFIG.environment}`,
        `Terminal     : ${SYSTEM_CONFIG.terminal}`,
        `Event        : ${EVENT_CONFIG.name}`,
        `Event Type   : ${EVENT_CONFIG.type.label}`,
    ],
}

export default systemInfoCommand