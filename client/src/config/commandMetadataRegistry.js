const COMMAND_METADATA = {
  help: {
    description: 'Show available commands',
    category: 'CORE',
    permission: 'PUBLIC',
    aliases: ['?', 'commands'],
  },

  about: {
    description: 'About EventShell',
    category: 'CORE',
    permission: 'PUBLIC',
    aliases: [],
  },

  status: {
    description: 'Show terminal status',
    category: 'CORE',
    permission: 'PUBLIC',
    aliases: [],
  },

  identity: {
    description: 'Show terminal identity',
    category: 'CORE',
    permission: 'PUBLIC',
    aliases: [],
  },

  'system.info': {
    description: 'Show system information',
    category: 'SYSTEM',
    permission: 'PUBLIC',
    aliases: ['sys.info'],
  },

  'system.status': {
    description: 'Show system status',
    category: 'SYSTEM',
    permission: 'PUBLIC',
    aliases: [],
  },

  'system.event': {
    description: 'Show current event',
    category: 'SYSTEM',
    permission: 'PUBLIC',
    aliases: [],
  },

  'event.info': {
    description: 'Show event information',
    category: 'EVENT',
    permission: 'PUBLIC',
    aliases: [],
  },

  'event.date': {
    description: 'Show event date and time',
    category: 'EVENT',
    permission: 'PUBLIC',
    aliases: [],
  },

  'event.location': {
    description: 'Show event location',
    category: 'EVENT',
    permission: 'PUBLIC',
    aliases: [],
  },

  'event.host': {
    description: 'Show event host',
    category: 'EVENT',
    permission: 'PUBLIC',
    aliases: [],
  },

  'event.type': {
    description: 'Show event type',
    category: 'EVENT',
    permission: 'PUBLIC',
    aliases: [],
  },

  'event.description': {
    description: 'Show event description',
    category: 'EVENT',
    permission: 'PUBLIC',
    aliases: [],
  },

  'event.schedule': {
    description: 'Show event schedule',
    category: 'EVENT',
    permission: 'PUBLIC',
    aliases: [],
  },

  'event.register': {
    description: 'Register for the event',
    category: 'EVENT',
    permission: 'PUBLIC',
    aliases: [],
  },

  'event.data': {
    description: 'Show complete event data',
    category: 'EVENT',
    permission: 'PUBLIC',
    aliases: [],
  },
}

export default COMMAND_METADATA