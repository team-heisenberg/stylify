import { Router } from 'express'
import { prisma } from '../app'

const router = Router()

// POST - Create Record

router.post('/', async (req, res) => {
  const appointmentDetails = await prisma.appointmentDetails.create({
    data: {
      ...req.body,
    },
  })

  res.json(appointmentDetails)
})

// GET - Retrieve Records
router.get('/', async (_, res) => {
  const appointmentDetailsList = await prisma.appointmentDetails.findMany()

  res.json(appointmentDetailsList)
})

// GET - Retrieve Record
router.get('/:appointmentDetailsID', async (req, res) => {
  const { appointmentDetailsID } = req.params

  const appointmentDetails = await prisma.appointmentDetails.findFirst({
    where: {
      appointmentDetailsID: Number(appointmentDetailsID),
    },
  })

  res.json(appointmentDetails)
})

// PUT - Update Record
router.put('/:appointmentDetailsID', async (req, res) => {
  const { appointmentDetailsID, ...data } = req.body
  const appointmentDetails = await prisma.appointmentDetails.update({
    where: {
      appointmentDetailsID: Number(appointmentDetailsID),
    },
    data,
  })

  res.json(appointmentDetails)
})

// DELETE - Delete Record
router.delete('/:appointmentDetailsID', async (req, res) => {
  const { appointmentDetailsID } = req.params

  const appointmentDetails = await prisma.appointmentDetails
    .delete({
      where: { appointmentDetailsID: Number(appointmentDetailsID) },
    })
    .catch((error) => error)

  res.json(appointmentDetails)
})

export { router as appointmentDetailsRouter }
