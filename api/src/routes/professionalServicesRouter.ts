
import { Router } from 'express'
import { prisma } from '../app'

const router = Router()

// POST - Create Record
router.post('/', async (req, res) => {
  const professionalServices = await prisma.professionalServices.create({
    data: {
      ...req.body,
    },
  })

  res.json(professionalServices)
})

// GET - Retrieve Records
router.get('/', async (_, res) => {
  const professionalServicesList = await prisma.professionalServices.findMany()

  res.json(professionalServicesList)
})

// GET - Retrieve Record
router.get('/:professionalServicesID', async (req, res) => {
  const { professionalServicesID } = req.params

  const professionalServices = await prisma.professionalServices.findFirst({
    where: {
      professionalServicesID: Number(professionalServicesID),
    },
  })

  res.json(professionalServices)
})

// PUT - Update Record
router.put('/:professionalServicesID', async (req, res) => {
  const { professionalServicesID, ...data } = req.body
  const test = await prisma.professionalServices.update({
    where: {
      professionalServicesID: Number(professionalServicesID),
    },
    data,
  })

  res.json(test)
})

// DELETE - Delete Record
router.delete('/:professionalServicesID', async (req, res) => {
  const { professionalServicesID } = req.params

  const test = await prisma.professionalServices
    .delete({
      where: { professionalServicesID: Number(professionalServicesID) },
    })
    .catch((error) => error)

  res.json(test)
})

export { router as professionalServicesRouter }
