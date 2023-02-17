import env from 'dotenv'
import path from 'path'
import { app } from './app'
import { router } from './routes'

env.config({ path: path.join(__dirname, '.env') })

const PORT = process.env.NODE_LOCAL_PORT || 8080

app.use(router)

app.listen(PORT, () => {
  console.log('Server running on: ' + PORT)
})