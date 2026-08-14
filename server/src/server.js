import dotenv from 'dotenv'
import app from './app.js'
import connectDatabase from './config/database.js'

dotenv.config()

const PORT = process.env.PORT || 5000

const startServer = async () => {
    try {
        await connectDatabase()

        app.listen(PORT, () => {
            console.log(`EventShell API running on port ${PORT}`)
        })
    } catch (error) {
        console.error('Failed to start server.')
        console.error(error.message)
        process.exit(1)
    }
}

startServer()