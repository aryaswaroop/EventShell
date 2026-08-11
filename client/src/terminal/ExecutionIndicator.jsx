import { useEffect, useState } from 'react'

const ExecutionIndicator = ({
    active = false,
    duration = 700,
}) => {
    const [dots, setDots] = useState('')

    useEffect(() => {
        if (!active) {
            setDots('')
            return undefined
        }

        const interval = setInterval(() => {
            setDots((previous) => {
                if (previous.length >= 3) {
                    return ''
                }

                return `${previous}.`
            })
        }, 180)

        const timeout = setTimeout(() => {
            clearInterval(interval)
        }, duration)

        return () => {
            clearInterval(interval)
            clearTimeout(timeout)
        }
    }, [active, duration])

    if (!active) {
        return null
    }

    return (
        <div className="execution-indicator">
            Executing{dots}
        </div>
    )
}

export default ExecutionIndicator