import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const router = Router()

// POST - Create Record
router.post('/', async (req, res) => {
  const deal = await prisma.deal.create({
    data: {
      ...req.body,
    },
  })

  res.json(deal)
})

// GET - Retrieve Records
router.get('/', async (_, res) => {
  const dealList = await prisma.deal.findMany({
    include: { business: true, service: true },
  })

  res.json(dealList)
})

// GET - Retrieve Record
router.get('/:dealID', async (req, res) => {
  const { dealID } = req.params

  const deal = await prisma.deal.findFirst({
    where: {
      dealID: Number(dealID),
    },
  })

  res.json(deal)
})

// PUT - Update Record
router.put('/:dealID', async (req, res) => {
  const { dealID, ...data } = req.body
  const test = await prisma.deal.update({
    where: {
      dealID: Number(dealID),
    },
    data,
  })

  res.json(test)
})

// DELETE - Delete Record
router.delete('/:dealID', async (req, res) => {
  const { dealID } = req.params

  const test = await prisma.deal
    .delete({
      where: { dealID: Number(dealID) },
    })
    .catch((error) => error)

  res.json(test)
})

export { router as dealRouter }
