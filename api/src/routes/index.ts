import { Router } from 'express'
import { appointmentDetailsRouter } from './appointmentDetailsRouter'
import { appointmentRouter } from './appointmentRouter'
import { businessRouter } from './businessRouter'
import { dealRouter } from './dealRouter'
import { professionalRouter } from './professionalRouter'
import { professionalServicesRouter } from './professionalServicesRouter'
import { reviewRouter } from './reviewRouter'
import { serviceRouter } from './serviceRouter'
import { serviceTypeRouter } from './serviceTypeRouter'
import { customerRouter } from './customerRouter'

const router = Router()

router.use('/appointment', appointmentRouter)
router.use('/appointmentDetails', appointmentDetailsRouter)
router.use('/business', businessRouter)
router.use('/deal', dealRouter)
router.use('/professional', professionalRouter)
router.use('/professionalServices', professionalServicesRouter)
router.use('/review', reviewRouter)
router.use('/service', serviceRouter)
router.use('/serviceType', serviceTypeRouter)
router.use('/customer', customerRouter)


export { router }
