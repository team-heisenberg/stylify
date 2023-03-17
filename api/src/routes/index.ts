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
import { authenticateToken, authRouter } from './authRouter'
import { searchRouter } from './searchBusinessOrService'
import { insightsRouter } from './insights'

const router = Router()

router.use('/auth', authRouter)
router.use('/search', authenticateToken, searchRouter)
router.use('/search', searchRouter)
router.use('/appointment', authenticateToken, appointmentRouter)
router.use('/appointmentDetails', authenticateToken, appointmentDetailsRouter)
router.use('/business', authenticateToken, businessRouter)
router.use('/deal', authenticateToken, dealRouter)
router.use('/professional', authenticateToken, professionalRouter)
router.use('/professionalServices', authenticateToken, professionalServicesRouter)
router.use('/review', authenticateToken, reviewRouter)
router.use('/service', authenticateToken, serviceRouter)
router.use('/service', serviceRouter)
router.use('/serviceType', authenticateToken, serviceTypeRouter)
router.use('/customer', customerRouter)
router.use('/insights', authenticateToken, insightsRouter)

export { router }
