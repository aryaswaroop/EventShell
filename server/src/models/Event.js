import mongoose from 'mongoose'

const eventSchema = new mongoose.Schema(
    {
        eventId: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        name: {
            type: String,
            required: true,
            trim: true,
        },

        type: {
            label: {
                type: String,
                required: true,
                trim: true,
            },

            category: {
                type: String,
                required: true,
                trim: true,
            },
        },

        status: {
            type: String,
            required: true,
            enum: ['ACTIVE', 'INACTIVE', 'CANCELLED', 'COMPLETED'],
            default: 'ACTIVE',
        },

        date: {
            type: String,
            required: true,
            trim: true,
        },

        time: {
            type: String,
            required: true,
            trim: true,
        },

        location: {
            type: String,
            required: true,
            trim: true,
        },

        host: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
            trim: true,
        },

        schedule: [
            {
                time: {
                    type: String,
                    required: true,
                    trim: true,
                },

                title: {
                    type: String,
                    required: true,
                    trim: true,
                },

                description: {
                    type: String,
                    trim: true,
                    default: '',
                },
            },
        ],

        registration: {
            enabled: {
                type: Boolean,
                default: false,
            },

            status: {
                type: String,
                enum: ['OPEN', 'CLOSED', 'FULL', 'NOT_AVAILABLE'],
                default: 'NOT_AVAILABLE',
            },

            message: {
                type: String,
                trim: true,
                default: '',
            },
        },
    },
    {
        timestamps: true,
    },
)

const Event = mongoose.model('Event', eventSchema)

export default Event