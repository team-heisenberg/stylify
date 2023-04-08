import { Router } from 'express'
import { prisma } from '../app'

const router = Router()

// POST - Create Record
router.post('/', async (req, res) => {
  const service = await prisma.service.create({
    data: {
      ...req.body,
    },
  })

  res.json(service)
})

// GET - Retrieve Records
router.get('/', async (req, res) => {
  const serviceList = await prisma.service.findMany()

  res.json(serviceList)
})

// GET - Retrieve Record
router.get('/:serviceID', async (req, res) => {
  const { serviceID } = req.params

  const service = await prisma.service.findFirst({
    where: {
      serviceID: Number(serviceID),
    },
  })

  res.json(service)
})

// PUT - Update Record
router.put('/:serviceID', async (req, res) => {
  const { serviceID, ...data } = req.body
  const test = await prisma.service.update({
    where: {
      serviceID: Number(serviceID),
    },
    data,
  })

  res.json(test)
})

// DELETE - Delete Record
router.delete('/:serviceID', async (req, res) => {
  const { serviceID } = req.params

  const test = await prisma.service
    .delete({
      where: { serviceID: Number(serviceID) },
    })
    .catch((error) => error)

  res.json(test)
})

export { router as serviceRouter }
