import express from 'express'
import cors from 'cors'

const app = express()

// Set Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (_, res) => {
  res.send('stylify API')
})

export { app }
