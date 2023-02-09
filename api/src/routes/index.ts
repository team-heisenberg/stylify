import { Router } from 'express'
import { testRouter } from './testRouter'

const router = Router()

router.use('/test', testRouter)

export { router }
