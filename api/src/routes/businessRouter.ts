import { Router } from 'express'
import { authenticateToken } from './authRouter'
import { prisma } from '../app'


const router = Router()

// POST - Create Record
router.post('/', async (req, res) => {
  const business = await prisma.business
    .create({
      data: {
        ...req.body,
      },
    })
    .catch((err) => console.warn(`Business already exists`, err))

  res.json(business)
})

// GET - Retrieve Records
router.get('/', authenticateToken, async (_, res) => {
  const businessList = await prisma.business.findMany()

  res.json(businessList)
})

// GET - Retrieve Record
router.get('/:businessID', authenticateToken, async (req, res) => {
  const { businessID } = req.params

  const business = await prisma.business.findFirst({
    where: {
      businessID: Number(businessID),
    },
  })

  res.json(business)
})

// PUT - Update Record
router.put('/:businessID', authenticateToken, async (req, res) => {
  const { businessID, ...data } = req.body
  const test = await prisma.business.update({
    where: {
      businessID: Number(businessID),
    },
    data,
  })

  res.json(test)
})

// DELETE - Delete Record
router.delete('/:businessID', authenticateToken, async (req, res) => {
  const { businessID } = req.params

  const test = await prisma.business
    .delete({
      where: { businessID: Number(businessID) },
    })
    .catch((error) => error)

  res.json(test)
})

export { router as businessRouter }
