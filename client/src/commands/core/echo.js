const echoCommand = {
    name: 'echo',
    description: 'Display a message',

    execute: ({ argumentText }) => [
        'ECHO',
        '',
        argumentText || 'No message provided.',
    ],
}

export default echoCommand