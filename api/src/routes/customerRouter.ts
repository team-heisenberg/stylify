import { Router } from 'express'
import { authenticateToken } from './authRouter'
import { prisma } from '../app'


const router = Router()

// POST - Create Record

router.post('/', async (req, res) => {
  const customer = await prisma.customer
    .create({
      data: {
        ...req.body,
      },
    })
    .catch((err) => console.warn(`Customer already exists`, err))


  res.json(customer)
})

// GET - Retrieve Records
router.get('/', authenticateToken, async (_, res) => {
  const customerList = await prisma.customer.findMany()

  res.json(customerList)
})

router.get('/:customerID', authenticateToken, async (req, res) => {
  const { customerID } = req.params

  const customer = await prisma.customer.findFirst({
    where: {
      customerID: Number(customerID),
    },
  })

  res.json(customer)
})

// PUT - Update Record
router.put('/:customerID', authenticateToken, async (req, res) => {
  const { customerID, ...data } = req.body
  const customer = await prisma.customer.update({
    where: {
      customerID: Number(customerID),
    },
    data,
  })

  res.json(customer)
})

// DELETE - Delete Record
router.delete('/:customerID', authenticateToken, async (req, res) => {
  const { customerID } = req.params

  const customer = await prisma.customer
    .delete({
      where: { customerID: Number(customerID) },
    })
    .catch((error) => error)

  res.json(customer)
})

export { router as customerRouter }
