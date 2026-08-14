import SYSTEM_CONFIG from '../../config/systemConfig'
import { getEvent } from '../../api/eventApi'

const EVENT_ID = 'eventshell-demo-001'

const systemInfoCommand = {
    name: 'system.info',

    description: 'Show system information',

    execute: async () => {
        const event = await getEvent(EVENT_ID)

        return [
            'SYSTEM INFORMATION',
            '',
            `Engine       : ${SYSTEM_CONFIG.name}`,
            `Version      : ${SYSTEM_CONFIG.version}`,
            `Environment  : ${SYSTEM_CONFIG.environment}`,
            `Terminal     : ${SYSTEM_CONFIG.terminal}`,
            `Event        : ${event.name}`,
            `Event Type   : ${event.type.label}`,
        ]
    },
}

export default systemInfoCommand