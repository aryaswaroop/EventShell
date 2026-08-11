import EVENT_CONFIG from '../../config/eventConfig'

const identityCommand = {
    name: 'identity',

    description: 'Show terminal identity',

    execute: () => [
        'TERMINAL IDENTITY',
        '',
        `User     : ${EVENT_CONFIG.terminal.username}`,
        `Host     : ${EVENT_CONFIG.terminal.hostname}`,
        `Prompt   : ${EVENT_CONFIG.terminal.username}@${EVENT_CONFIG.terminal.hostname}:~$`,
    ],
}

export default identityCommand