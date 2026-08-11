import {
    OUTPUT_TYPES,
    isValidOutputType,
} from './outputTypes'

const normalizeOutput = (output, type = OUTPUT_TYPES.INFO) => {
    const normalizedType = isValidOutputType(type)
        ? type
        : OUTPUT_TYPES.INFO

    if (Array.isArray(output)) {
        return {
            type: normalizedType,
            lines: output,
        }
    }

    if (typeof output === 'string') {
        return {
            type: normalizedType,
            lines: [output],
        }
    }

    if (output && typeof output === 'object') {
        return {
            type: isValidOutputType(output.type)
                ? output.type
                : normalizedType,
            lines: Array.isArray(output.lines)
                ? output.lines
                : [],
        }
    }

    return {
        type: normalizedType,
        lines: [],
    }
}

export default normalizeOutput