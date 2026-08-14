import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import eventRoutes from './routes/eventRoutes.js'

const app = express()

app.use(helmet())

app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true,
    }),
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.get('/api/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'EventShell API is running',
    })
})

app.use('/api/events', eventRoutes)

export default app