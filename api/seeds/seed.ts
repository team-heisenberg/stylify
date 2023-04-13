import { PrismaClient } from '@prisma/client'
import {
  genAppointments,
  genBusinesses,
  genCustomers,
  genProfessionals,
  genProfessionalServices,
  genServices,
  genServiceTypes,
  genTimeSlots
} from './utils'
const prisma = new PrismaClient()

async function main() {
  await prisma.customer.createMany({
    data: genCustomers(10),
  })

  await prisma.professional.createMany({
    data: genProfessionals(5, [1, 2]),
  })

  await prisma.timeSlot.createMany({
    data: genTimeSlots(10, [1, 2, 3, 4, 5]),
  })

  await prisma.business.createMany({
    data: genBusinesses(2),
  })

  await prisma.serviceType.createMany({
    data: genServiceTypes(10),
  })

  await prisma.service.createMany({
    data: genServices(10, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 2),
  })

  await prisma.professionalServices.createMany({
    data: genProfessionalServices(10, [1, 2, 3, 4, 5]),
  })

  const pr = genAppointments(20, 5, 2, 10).map(async (a) => {
    await prisma.appointment.create({
      data: a,
    })
  })

  await Promise.all(pr)

  await prisma.deal.create({
    data: {
      serviceID: 1,
      dealAmount: 1,
      price: 10,
      startDate: new Date(),
      endDate: new Date(),
      businessID: 1,
    },
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
