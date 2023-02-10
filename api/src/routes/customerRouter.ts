import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const router = Router()

// POST - Create Record

router.post('/', async (req, res) => {
  const customer = await prisma.customer.create({
    data: {
      ...req.body,
    },
  })

  res.json(customer)
})

// GET - Retrieve Records
router.get('/', async (_, res) => {
  const customerList = await prisma.customer.findMany()

  res.json(customerList)
})

// PUT - Update Record
router.put('/', async (req, res) => {
  const { customerID, ...data } = req.body
  const customer = await prisma.customer.update({
    where: {
      customerID: Number (customerID),
    },
    data,
  })

  res.json(customer)
})

// DELETE - Delete Record
router.delete('/:customerID', async (req, res) => {
  const { customerID } = req.params

  const customer = await prisma.customer
    .delete({
      where: { customerID: Number (customerID) },
    })
    .catch((error) => error)

  res.json(customer)
})

export { router as customerRouter }
