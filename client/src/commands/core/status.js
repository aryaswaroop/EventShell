const statusCommand = {
    name: 'status',
    description: 'Show terminal status',

    execute: () => [
        'SYSTEM STATUS',
        '',
        'Terminal     : ONLINE',
        'Event Engine : READY',
        'Connection   : LOCAL',
        'Status       : OPERATIONAL',
    ],
}

export default statusCommand