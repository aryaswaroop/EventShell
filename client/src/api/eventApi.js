const API_BASE_URL = 'http://localhost:5000/api'

const getEvent = async (eventId) => {
    const response = await fetch(
        `${API_BASE_URL}/events/${eventId}`,
    )

    const data = await response.json()

    if (!response.ok) {
        throw new Error(
            data.message || 'Failed to fetch event',
        )
    }

    return data.data
}

const getEvents = async () => {
    const response = await fetch(
        `${API_BASE_URL}/events`,
    )

    const data = await response.json()

    if (!response.ok) {
        throw new Error(
            data.message || 'Failed to fetch events',
        )
    }

    return data.data
}

export {
    getEvent,
    getEvents,
}