const COMMAND_BEHAVIOR = {
    help: {
        executionDelay: 350,
        animationSpeed: 120,
    },

    'event.info': {
        executionDelay: 700,
        animationSpeed: 120,
    },

    'event.date': {
        executionDelay: 600,
        animationSpeed: 120,
    },

    'event.data': {
        executionDelay: 900,
        animationSpeed: 120,
    },

    'event.location': {
        executionDelay: 650,
        animationSpeed: 120,
    },

    clear: {
        executionDelay: 0,
        animationSpeed: 0,
    },
}

const DEFAULT_COMMAND_BEHAVIOR = {
    executionDelay: 700,
    animationSpeed: 120,
}

export const getCommandBehavior = (command) => {
    return (
        COMMAND_BEHAVIOR[command] ||
        DEFAULT_COMMAND_BEHAVIOR
    )
}

export default COMMAND_BEHAVIOR