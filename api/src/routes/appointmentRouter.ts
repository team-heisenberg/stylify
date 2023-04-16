import { Router } from 'express'
import { prisma } from '../app'

const router = Router()

// POST - Create Record
router.post('/', async (req, res) => {
  const {
    customerID,
    businessID,
    professionalID,
    appointmentDateTime,
    appointmentType,
    appointmentDetails,
    dateAndTime,
  } = req.body
  const appointment = await prisma.appointment.create({
    data: {
      customerID,
      businessID,
      professionalID,
      isConfirmed: true,
      appointmentDateTime,
      appointmentType,
      dateAndTime,
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

type UpcomingAppointments = {
  appointmentID: number
  customerName: string
  professionalName: string
  dateAndTime: string
  services?: string
  total: number
}

// GET - Retrieve Records by Business
router.get('/upcomingByBusiness/:businessID', async (req, res) => {
  const { businessID } = req.params

  const upcomingAppointments: UpcomingAppointments[] = await prisma.$queryRawUnsafe(
    `SELECT a.appointmentID,  CONCAT(c.firstName, ' ', c.lastName) as customerName,
      b.businessName,
      CONCAT(p.firstName, ' ', p.lastName) as professionalName,
      a.dateAndTime,
      p.photoURL as professionalImage,
      SUM(ad.price) as total
      FROM Appointment a 
      JOIN Customer c ON c.customerID = a.customerID 
      JOIN Business b ON b.businessID = a.businessID 
      JOIN Professional p ON p.professionalID  = a.professionalID 
      JOIN AppointmentDetails ad ON ad.appointmentID  = a.appointmentID 
      WHERE  a.businessID = ?
      
      GROUP BY 1,2,3,4,5,6
      ORDER BY a.appointmentID DESC
      LIMIT 10
      `,
    businessID
  )

  const pr = upcomingAppointments.map(async (ap) => {
    const servicesArr: any[] = await prisma.$queryRawUnsafe(
      `SELECT s.serviceName FROM AppointmentDetails ad 
        LEFT JOIN Service s ON s.serviceID = ad.serviceID 
        
        WHERE ad.appointmentID = ?`,
      ap.appointmentID
    )

    console.log('>>>>>>>>>>>>>>>>>', servicesArr)

    const services = servicesArr.reduce((acc, value) => {
      if (acc && acc.length > 0) {
        acc = acc + `, ${value.serviceName}`
      } else {
        acc = value.serviceName
      }
      return acc
    }, '')
    return { ...ap, services }
  })

  const result = await Promise.all(pr)

  if (result?.length === 0) {
    res.status(400).end()
    return
  }

  res.json(result)
})

// GET - Retrieve Records by Customer
router.get('/upcomingByCustomer/:customerID', async (req, res) => {
  const { customerID } = req.params

  const upcomingAppointments: UpcomingAppointments[] = await prisma.$queryRawUnsafe(
    `SELECT a.appointmentID,  CONCAT(c.firstName, ' ', c.lastName) as customerName,
      b.businessName,
      CONCAT(p.firstName, ' ', p.lastName) as professionalName,
      a.dateAndTime,
      p.photoURL as professionalImage,
      SUM(ad.price) as total
      FROM Appointment a 
      JOIN Customer c ON c.customerID = a.customerID 
      JOIN Business b ON b.businessID = a.businessID 
      JOIN Professional p ON p.professionalID  = a.professionalID 
      JOIN AppointmentDetails ad ON ad.appointmentID  = a.appointmentID 
      WHERE  a.customerID = ?
      
      GROUP BY 1,2,3,4,5,6
      ORDER BY a.appointmentID DESC
      LIMIT 10`,
    customerID
  )

  const pr = upcomingAppointments.map(async (ap) => {
    const servicesArr: any[] = await prisma.$queryRawUnsafe(
      `SELECT s.serviceName FROM AppointmentDetails ad 
        LEFT JOIN Service s ON s.serviceID = ad.serviceID 
        
        WHERE ad.appointmentID = ?`,
      ap.appointmentID
    )

    console.log('>>>>>>>>>>>>>>>>>', servicesArr)

    const services = servicesArr.reduce((acc, value) => {
      if (acc && acc.length > 0) {
        acc = acc + `, ${value.serviceName}`
      } else {
        acc = value.serviceName
      }
      return acc
    }, '')
    return { ...ap, services }
  })

  const result = await Promise.all(pr)

  if (result?.length === 0) {
    res.status(400).end()
    return
  }

  res.json(result)
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
