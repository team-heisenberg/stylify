import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const router = Router()

// POST - Create Record
router.post('/', async (req, res) => {
  const serviceType = await prisma.serviceType.create({
    data: {
      ...req.body,
    },
  })

  res.json(serviceType)
})

// GET - Retrieve Records
router.get('/:serviceTypeID', async (req, res) => {
  const { serviceTypeID } = req.params
  const serviceTypeList = await prisma.serviceType.findFirst({
    where: {
      serviceTypeID: Number(serviceTypeID),
    },
  })

  res.json(serviceTypeList)
})

// GET - Retrieve Record
router.get('/:serviceTypeID', async (req, res) => {
  const { serviceTypeID } = req.params

  const serviceType = await prisma.serviceType.findFirst({
    where: {
      serviceTypeID: Number(serviceTypeID),
    },
  })

  res.json(serviceType)
})

// PUT - Update Record
router.put('/', async (req, res) => {
  const { serviceTypeID, ...data } = req.body
  const test = await prisma.serviceType.update({
    where: {
      serviceTypeID: Number(serviceTypeID),
    },
    data,
  })

  res.json(test)
})

// DELETE - Delete Record
router.delete('/:serviceTypeID', async (req, res) => {
  const { serviceTypeID } = req.params

  const test = await prisma.serviceType
    .delete({
      where: { serviceTypeID: Number(serviceTypeID) },
    })
    .catch((error) => error)

  res.json(test)
})

export { router as serviceTypeRouter }
