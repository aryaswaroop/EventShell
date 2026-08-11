export const OUTPUT_TYPES = {
    SUCCESS: 'success',
    INFO: 'info',
    WARNING: 'warning',
    ERROR: 'error',
    SYSTEM: 'system',
    COMMAND: 'command',
    ANIMATION: 'animation',
}

export const isValidOutputType = (type) => {
    return Object.values(OUTPUT_TYPES).includes(type)
}