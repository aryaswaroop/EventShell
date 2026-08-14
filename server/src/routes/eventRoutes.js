import express from 'express'

import {
    getEvents,
    getEvent,
    createNewEvent,
    updateEvent,
    deleteEvent,
} from '../controllers/eventController.js'

const router = express.Router()

router.get('/', getEvents)

router.post('/', createNewEvent)

router.get('/:eventId', getEvent)

router.put('/:eventId', updateEvent)

router.delete('/:eventId', deleteEvent)

export default router