import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.customer.create({
    data: {
      customerID: 1,
      email: 'test1@email.com',
      password: 'password1',
      firstName: 'Test',
      lastName: 'Test',
      avatarURL: 'https://picsum.photos/200/300',
    },
  })

  await prisma.professional.create({
    data: {
      professionalID: 1,
      firstName: 'Joe',
      lastName: 'Doe',
      businessID: 1,
    },
  })

  await prisma.business.create({
    data: {
      email: 'testbusiness@mail.com',
      password: 'password1',
      businessName: 'Book My Cut',
      businessType: 'Hair Salon',
      description: 'Have your hair cut',
      location: '12th Ave',
    },
  })

  await prisma.serviceType.createMany({
    data: [
      {
        serviceTypeID: 1,
        serviceType: 'hair',
      },
      {
        serviceTypeID: 2,
        serviceType: 'nails',
      },
    ],
  })

  await prisma.service.createMany({
    data: [
      {
        serviceName: 'hair curt',
        servicePrice: 35,
        serviceTypeID: 1,
        businessID: 1,
      },
      {
        serviceName: 'naiils',
        servicePrice: 35,
        serviceTypeID: 2,
        businessID: 1,
      },
    ],
  })

  await prisma.professionalServices.create({
    data: {
      serviceID: 1,
      professionalID: 1,
    },
  })

  await prisma.appointment.create({
    data: {
      customerID: 1,
      businessID: 1,
      professionalID: 1,
      isConfirmed: true,
      appointmentDateTime: new Date(),
      reviews: {
        create: {
          reviewDetails: 'good service',
          appointmentRating: 5,
        }
      },
      appointmentDetails: {
        connectOrCreate: {
          where: {
            appointmentDetailsID: 1
          },
          create: {
            serviceID: 1,
            price: 45
          }
        }
      }
    }
  })

  await prisma.deal.create({
    data: {
      serviceID: 1,
      dealAmount: 1,
      price: 10,
      startDate: new Date(),
      endDate: new Date(),
      businessID: 1
    }
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
