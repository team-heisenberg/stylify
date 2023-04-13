import { Router } from 'express'
import { prisma } from '../app'

const router = Router()

// POST - Create Record
router.post('/', async (req, res) => {
  const { customerID, businessID, professionalID, appointmentDateTime, appointmentType, appointmentDetails } = req.body
  const appointment = await prisma.appointment.create({
    data: {
      customerID,
      businessID,
      professionalID,
      isConfirmed: true,
      appointmentDateTime: new Date(),
      appointmentType,
      appointmentDetails: {
        createMany: {
          data: appointmentDetails.map(({ name, duration, ...rest }) => rest),
        },
      },
    },
  })

  res.json(appointment)
})

/*
customerID
businessID
professionalID
appointmentDateTime
appointmentType
appointmentDetails: [{ServiceID, price}]
*/

// GET - Retrieve Records
router.get('/', async (_, res) => {
  const appointmentList = await prisma.appointment.findMany()

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

// GET - Retrieve Records by Business
router.get('/byBusiness/:businessID', async (req, res) => {
  const { businessID } = req.params

  const appointments = await prisma.appointment.findMany({
    where: {
      businessID: Number(businessID),
    },
    include: {
      customer: true,
      professional: true,
      appointmentDetails: {
        include: {
          service: true,
        },
      },
    },
  })

  res.json(appointments)
})

// PUT - Update Record
router.put('/:appointmentID', async (req, res) => {
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
