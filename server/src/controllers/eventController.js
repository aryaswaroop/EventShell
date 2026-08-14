import {
    getAllEvents,
    getEventById,
    createEvent,
    updateEventById,
    deleteEventById,
} from '../services/eventService.js'

const getEvents = async (req, res) => {
    try {
        const events = await getAllEvents()

        res.status(200).json({
            success: true,
            count: events.length,
            data: events,
        })
    } catch (error) {
        console.error('Get events error:', error.message)

        res.status(500).json({
            success: false,
            message: 'Failed to fetch events',
        })
    }
}

const getEvent = async (req, res) => {
    try {
        const { eventId } = req.params

        const event = await getEventById(eventId)

        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Event not found',
            })
        }

        res.status(200).json({
            success: true,
            data: event,
        })
    } catch (error) {
        console.error('Get event error:', error.message)

        res.status(500).json({
            success: false,
            message: 'Failed to fetch event',
        })
    }
}

const createNewEvent = async (req, res) => {
    try {
        const event = await createEvent(req.body)

        res.status(201).json({
            success: true,
            message: 'Event created successfully',
            data: event,
        })
    } catch (error) {
        console.error('Create event error:', error.message)

        res.status(400).json({
            success: false,
            message: 'Failed to create event',
            error: error.message,
        })
    }
}

const updateEvent = async (req, res) => {
    try {
        const { eventId } = req.params

        const event = await updateEventById(eventId, req.body)

        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Event not found',
            })
        }

        res.status(200).json({
            success: true,
            message: 'Event updated successfully',
            data: event,
        })
    } catch (error) {
        console.error('Update event error:', error.message)

        res.status(400).json({
            success: false,
            message: 'Failed to update event',
            error: error.message,
        })
    }
}

const deleteEvent = async (req, res) => {
    try {
        const { eventId } = req.params

        const event = await deleteEventById(eventId)

        if (!event) {
            return res.status(404).json({
                success: false,
                message: 'Event not found',
            })
        }

        res.status(200).json({
            success: true,
            message: 'Event deleted successfully',
            data: event,
        })
    } catch (error) {
        console.error('Delete event error:', error.message)

        res.status(500).json({
            success: false,
            message: 'Failed to delete event',
        })
    }
}

export {
    getEvents,
    getEvent,
    createNewEvent,
    updateEvent,
    deleteEvent,
}