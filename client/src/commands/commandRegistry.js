import helpCommand from './core/help'
import aboutCommand from './core/about'
import statusCommand from './core/status'
import echoCommand from './core/echo'

import eventInfoCommand from './event/eventInfo'
import eventDateCommand from './event/eventDate'
import eventDataCommand from './event/eventData'
import eventLocationCommand from './event/eventLocation'
import eventHostCommand from './event/eventHost'
import eventTypeCommand from './event/eventType'
import eventDescriptionCommand from './event/eventDescription'
import identityCommand from './core/identity'
import systemInfoCommand from './core/systemInfo'
import systemStatusCommand from './core/systemStatus'
import systemEventCommand from './core/systemEvent'
import eventScheduleCommand from './event/eventSchedule'
import eventRegisterCommand from './event/eventRegister'

const COMMANDS = {
    [helpCommand.name]: helpCommand,
    [aboutCommand.name]: aboutCommand,
    [statusCommand.name]: statusCommand,
    [echoCommand.name]: echoCommand,

    [eventInfoCommand.name]: eventInfoCommand,
    [eventDateCommand.name]: eventDateCommand,
    [eventLocationCommand.name]: eventLocationCommand,
    [eventDataCommand.name]: eventDataCommand,
    [eventHostCommand.name]: eventHostCommand,
    [eventTypeCommand.name]: eventTypeCommand,
    [eventDescriptionCommand.name]: eventDescriptionCommand,
    [identityCommand.name]: identityCommand,
    [systemInfoCommand.name]: systemInfoCommand,
    [systemStatusCommand.name]: systemStatusCommand,
    [systemEventCommand.name]: systemEventCommand,
    [eventScheduleCommand.name]: eventScheduleCommand,
    [eventRegisterCommand.name]: eventRegisterCommand,
}

export default COMMANDS;