import COMMANDS from '../commands/commandRegistry'
import COMMAND_METADATA from '../config/commandMetadataRegistry'

const calculateDistance = (first, second) => {
  const matrix = Array.from(
    { length: second.length + 1 },
    () => Array(first.length + 1).fill(0),
  )

  for (let row = 0; row <= second.length; row += 1) {
    matrix[row][0] = row
  }

  for (let column = 0; column <= first.length; column += 1) {
    matrix[0][column] = column
  }

  for (let row = 1; row <= second.length; row += 1) {
    for (let column = 1; column <= first.length; column += 1) {
      const cost =
        second[row - 1] === first[column - 1] ? 0 : 1

      matrix[row][column] = Math.min(
        matrix[row - 1][column] + 1,
        matrix[row][column - 1] + 1,
        matrix[row - 1][column - 1] + cost,
      )
    }
  }

  return matrix[second.length][first.length]
}

const getAllCommandNames = () => {
  const commandNames = Object.keys(COMMANDS)

  const aliases = Object.values(COMMAND_METADATA).flatMap(
    (metadata) => metadata.aliases || [],
  )

  return [...new Set([...commandNames, ...aliases])]
}

const getClosestCommands = (input) => {
  const normalizedInput = input.trim().toLowerCase()

  if (!normalizedInput) {
    return []
  }

  const commands = getAllCommandNames()

  const scoredCommands = commands
    .map((command) => {
      const normalizedCommand = command.toLowerCase()

      return {
        command,
        distance: calculateDistance(
          normalizedInput,
          normalizedCommand,
        ),
      }
    })
    .sort((first, second) => first.distance - second.distance)

  const maxDistance =
    normalizedInput.length <= 6 ? 1 : 2

  return scoredCommands
    .filter((item) => item.distance <= maxDistance)
    .slice(0, 5)
    .map((item) => item.command)
}

export default getClosestCommands