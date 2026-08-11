import { useEffect, useState } from 'react'

const AnimatedOutput = ({
    lines = [],
    type = 'info',
    speed = 120,
}) => {
    const [visibleLines, setVisibleLines] = useState(0)

    useEffect(() => {
        setVisibleLines(0)

        if (lines.length === 0) {
            return
        }

        let currentLine = 0

        const interval = setInterval(() => {
            currentLine += 1

            setVisibleLines(currentLine)

            if (currentLine >= lines.length) {
                clearInterval(interval)
            }
        }, speed)

        return () => {
            clearInterval(interval)
        }
    }, [lines, speed])

    return (
        <div className={`terminal-output terminal-output-${type}`}>
            {lines.slice(0, visibleLines).map((line, index) => (
                <div
                    key={`${index}-${line}`}
                    className="terminal-output-line"
                >
                    {line || '\u00A0'}
                </div>
            ))}
        </div>
    )
}

export default AnimatedOutput