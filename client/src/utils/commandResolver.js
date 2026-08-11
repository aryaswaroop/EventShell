import COMMANDS from '../commands/commandRegistry'
import COMMAND_METADATA from '../config/commandMetadataRegistry'

const getCommandNames = () => {
  return Object.keys(COMMANDS)
}

const getCommandAliases = () => {
  const aliases = []

  Object.entries(COMMAND_METADATA).forEach(
    ([commandName, metadata]) => {
      const commandAliases = metadata.aliases || []

      commandAliases.forEach((alias) => {
        aliases.push({
          alias,
          commandName,
        })
      })
    },
  )

  return aliases
}

const resolveCommand = (input) => {
  const normalizedInput = input.trim().toLowerCase()

  if (!normalizedInput) {
    return null
  }

  if (COMMANDS[normalizedInput]) {
    return {
      commandName: normalizedInput,
      command: COMMANDS[normalizedInput],
      matchedBy: 'command',
    }
  }

  const aliasMatch = getCommandAliases().find(
    ({ alias }) => alias.toLowerCase() === normalizedInput,
  )

  if (aliasMatch) {
    const command = COMMANDS[aliasMatch.commandName]

    if (command) {
      return {
        commandName: aliasMatch.commandName,
        command,
        matchedBy: 'alias',
      }
    }
  }

  return null
}

const getCommandSuggestions = (input) => {
  const normalizedInput = input.trim().toLowerCase()

  if (!normalizedInput) {
    return []
  }

  const commandMatches = getCommandNames().filter((commandName) =>
    commandName.startsWith(normalizedInput),
  )

  const aliasMatches = getCommandAliases()
    .filter(({ alias }) =>
      alias.toLowerCase().startsWith(normalizedInput),
    )
    .map(({ alias }) => alias)

  return [...new Set([...commandMatches, ...aliasMatches])]
}

export {
  resolveCommand,
  getCommandSuggestions,
}

export default resolveCommand