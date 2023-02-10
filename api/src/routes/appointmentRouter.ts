import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const router = Router()

// POST - Create Record
router.post('/', async (req, res) => {
  const appointment = await prisma.appointment.create({
    data: {
      ...req.body,
    },
  })

  res.json(appointment)
})

// GET - Retrieve Records
router.get('/:apppointmentID', async (req, res) => {
  const { apppointmentID } = req.params
  const appointmentList = await prisma.appointment.findFirst({
    where: {
      appointmentID: Number(apppointmentID),
    },
  })

  res.json(appointmentList)
})

// GET - Retrieve Record
router.get('/:appointmentID', async (req, res) => {
  const { appointmentID } = req.params

  const appointment = await prisma.appointment.findFirst({
    where: {
      appointmentID: Number(appointmentID),
    },
  })

  res.json(appointment)
})

// PUT - Update Record
router.put('/', async (req, res) => {
  const { appointmentID, ...data } = req.body
  const test = await prisma.appointment.update({
    where: {
      appointmentID: Number(appointmentID),
    },
    data,
  })

  res.json(test)
})

// DELETE - Delete Record
router.delete('/:appointmentID', async (req, res) => {
  const { appointmentID } = req.params

  const test = await prisma.appointment
    .delete({
      where: { appointmentID: Number(appointmentID) },
    })
    .catch((error) => error)

  res.json(test)
})

export { router as appointmentRouter }
