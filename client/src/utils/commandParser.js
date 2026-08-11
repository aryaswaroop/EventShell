export const parseCommand = (input) => {
    const trimmedInput = input.trim()

    if (!trimmedInput) {
        return {
            raw: '',
            command: '',
            arguments: [],
            argumentText: '',
        }
    }

    const parts = trimmedInput.match(/(?:[^\s"]+|"[^"]*")+/g) || []

    const command = parts.shift()?.toLowerCase() || ''

    const argumentsList = parts.map((argument) => {
        if (
            argument.startsWith('"') &&
            argument.endsWith('"')
        ) {
            return argument.slice(1, -1)
        }

        return argument
    })

    return {
        raw: trimmedInput,
        command,
        arguments: argumentsList,
        argumentText: argumentsList.join(' '),
    }
}