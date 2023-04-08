import { Router } from 'express'
import { prisma } from '../app'

const router = Router()

router.get('/', async (req, res) => {
  const { initialDate, finalDate, businessID } = req.query

  const result: any[] = await prisma.$queryRawUnsafe(
    `SELECT  SUM(ad.price) as Total from Appointment a
  JOIN AppointmentDetails ad ON ad.appointmentID = a.appointmentID 
  
  WHERE a.appointmentDateTime BETWEEN ? AND ? AND a.businessID = ?`,
    initialDate,
    finalDate,
    businessID
  )

  if (result?.length === 0) {
    res.status(400).end()
    return
  }

  res.json(result[0])
})

router.get('/byProfessional', async (req, res) => {
  const { initialDate, finalDate, businessID } = req.query

  let result: any[] = await prisma.$queryRawUnsafe(
    `
  SELECT a.professionalID, p.firstName, p.lastName, SUM(ad.price) as Total, COUNT(a.appointmentID) as TotalAppointments  FROM Appointment a 
  JOIN AppointmentDetails ad ON a.appointmentID  = ad.appointmentID 
  JOIN Professional p ON p.professionalID = a.professionalID 
  WHERE a.appointmentDateTime BETWEEN ? AND ? AND a.businessID = ?
  GROUP  BY 1,2,3
  `,
    initialDate,
    finalDate,
    businessID
  )

  if (result?.length === 0) {
    res.status(400).end()
    return
  }

  result = result.map(r => ({...r, TotalAppointments: Number(r.TotalAppointments)}))

  res.json(result)
})

router.get('/byType', async (req, res) => {
  const { initialDate, finalDate, businessID } = req.query

  let result: any[] = await prisma.$queryRawUnsafe(
    `
    SELECT a.appointmentType, SUM(ad.price) as Total, COUNT(a.appointmentID) as TotalAppointments  FROM Appointment a 
    JOIN AppointmentDetails ad ON a.appointmentID  = ad.appointmentID 
    WHERE a.appointmentDateTime BETWEEN ? AND ? AND a.businessID = ?
    GROUP  BY 1
  `,
    initialDate,
    finalDate,
    businessID
  )

  if (result?.length === 0) {
    res.status(400).end()
    return
  }

  result = result.map(r => ({...r, TotalAppointments: Number(r.TotalAppointments)}))

  res.json(result)
})

export { router as insightsRouter }
