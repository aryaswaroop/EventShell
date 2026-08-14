import { getEvent } from '../../api/eventApi'

const EVENT_ID = 'eventshell-demo-001'

const eventScheduleCommand = {
    name: 'event.schedule',

    description: 'Show event schedule',

    execute: async () => {
        const event = await getEvent(EVENT_ID)

        const output = [
            'EVENT SCHEDULE',
            '',
        ]

        if (!event.schedule || event.schedule.length === 0) {
            output.push('No schedule available.')
            return output
        }

        event.schedule.forEach((item, index) => {
            output.push(
                `${item.time} ───── ${item.title}`,
            )

            if (item.description) {
                output.push(
                    `             ${item.description}`,
                )
            }

            if (index < event.schedule.length - 1) {
                output.push('')
            }
        })

        return output
    },
}

export default eventScheduleCommand