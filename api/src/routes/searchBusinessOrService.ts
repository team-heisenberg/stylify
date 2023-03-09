import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const router = Router()

// GET - Retrieve Records
router.get('/', async (req, res) => {
  const { q } = req.query
  const result = await prisma.$queryRawUnsafe(
    'SELECT distinct b.* from Service s JOIN Business b on b.businessID = s.businessID  WHERE ((UPPER(s.serviceName)LIKE UPPER(?)) or (UPPER(b.businessName) LIKE UPPER(?)))',
    `%${q}%`,
    `%${q}%`
  )

  res.json(result)
})

export { router as searchRouter }
