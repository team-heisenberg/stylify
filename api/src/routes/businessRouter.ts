
import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const router = Router()

// POST - Create Record
router.post('/', async (req, res) => {
  const business = await prisma.business.create({
    data: {
      ...req.body,
    },
  })

  res.json(business)
})

// GET - Retrieve Records
router.get('/', async (_, res) => {
  const businessList = await prisma.business.findFirst()

  res.json(businessList)
})

// GET - Retrieve Record
router.get('/:businessID', async (req, res) => {
  const { businessID } = req.params

  const business = await prisma.business.findFirst({
    where: {
      businessID: Number(businessID)
    }
  })

  res.json(business)
})

// PUT - Update Record
router.put('/', async (req, res) => {
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
router.delete('/:businessID', async (req, res) => {
  const { businessID} = req.params

  const test = await prisma.business
    .delete({
      where: { businessID: Number(businessID) },
    })
    .catch((error) => error)

  res.json(test)
})

export { router as businessRouter }
