import { Router } from 'express'
import { prisma } from '../app'

const router = Router()

// POST - Create Record
router.post('/', async (req, res) => {
  const professional = await prisma.professional.create({
    data: {
      ...req.body,
    },
  })

  res.json(professional)
})

// GET - Retrieve Records
router.get('/', async (_, res) => {
  const professionalList = await prisma.professional.findMany()

  res.json(professionalList)
})

// GET - Retrieve Record
router.get('/:professionalID', async (req, res) => {
  const { professionalID } = req.params

  const professional = await prisma.professional.findFirst({
    where: {
      professionalID: Number(professionalID),
    },
  })

  res.json(professional)
})

// PUT - Update Record
router.put('/:professionalID', async (req, res) => {
  const { professionalID, ...data } = req.body
  const test = await prisma.professional.update({
    where: {
      professionalID: Number(professionalID),
    },
    data,
  })

  res.json(test)
})

// DELETE - Delete Record
router.delete('/:professionalID', async (req, res) => {
  const { professionalID } = req.params

  const test = await prisma.professional
    .delete({
      where: { professionalID: Number(professionalID) },
    })
    .catch((error) => error)

  res.json(test)
})

export { router as professionalRouter }
