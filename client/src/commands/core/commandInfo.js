import COMMANDS from '../commandRegistry'
import COMMAND_METADATA from '../../config/commandMetadataRegistry'

const commandInfoCommand = {
  name: 'command.info',

  description: 'Show command metadata',

  category: 'CORE',

  permission: 'PUBLIC',

  aliases: ['cmd.info'],

  execute: ({ arguments: commandArguments }) => {
    const commandName = commandArguments?.[0]

    if (!commandName) {
      return [
        'COMMAND INFO',
        '',
        'Usage : command.info <command>',
        '',
        'Example:',
        'command.info event.info',
      ]
    }

    const command = COMMANDS[commandName]

    if (!command) {
      return [
        'COMMAND INFO',
        '',
        `Command not found : ${commandName}`,
      ]
    }

    const metadata = COMMAND_METADATA[commandName]

    return [
      'COMMAND INFO',
      '',
      `Name        : ${command.name}`,
      `Description : ${command.description}`,
      `Category    : ${metadata?.category || 'UNDEFINED'}`,
      `Permission  : ${metadata?.permission || 'UNDEFINED'}`,
      `Aliases     : ${metadata?.aliases?.join(', ') || 'None'}`,
    ]
  },
}

export default commandInfoCommand