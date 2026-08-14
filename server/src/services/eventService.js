import Event from '../models/Event.js'

const getAllEvents = async () => {
    return await Event.find().sort({ createdAt: -1 })
}

const getEventById = async (eventId) => {
    return await Event.findOne({ eventId })
}

const createEvent = async (eventData) => {
    return await Event.create(eventData)
}

const updateEventById = async (eventId, updateData) => {
    return await Event.findOneAndUpdate(
        { eventId },
        updateData,
        {
            new: true,
            runValidators: true,
        }
    )
}

const deleteEventById = async (eventId) => {
    return await Event.findOneAndDelete({ eventId })
}

export {
    getAllEvents,
    getEventById,
    createEvent,
    updateEventById,
    deleteEventById,
}