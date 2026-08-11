import COMMAND_METADATA from '../../config/commandMetadataRegistry'

const helpCommand = {
  name: 'help',

  description: 'Show available commands',

  category: 'CORE',

  permission: 'PUBLIC',

  aliases: ['?', 'commands'],

  execute: () => {
    const categories = {}

    Object.entries(COMMAND_METADATA).forEach(
      ([commandName, metadata]) => {
        if (!categories[metadata.category]) {
          categories[metadata.category] = []
        }

        categories[metadata.category].push({
          name: commandName,
          description: metadata.description,
        })
      },
    )

    const output = ['AVAILABLE COMMANDS', '']

    Object.entries(categories).forEach(
      ([categoryName, commands]) => {
        output.push(categoryName)

        commands.forEach((command) => {
          output.push(
            `  ${command.name.padEnd(20)} ${command.description}`,
          )
        })

        output.push('')
      },
    )

    return output
  },
}

export default helpCommand