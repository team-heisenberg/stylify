import { PrismaClient } from '@prisma/client'
import { genAppointmentsProd } from './utils'
const prisma = new PrismaClient()

async function main() {
  await prisma.customer.createMany({
    data: [
      {
        customerID: 1,
        email: 'customer1@email.com',
        password: '<redacted>',
        firstName: 'Kaho',
        lastName: 'Fujita',
        avatarURL: 'https://picsum.photos/200/300',
      },
      {
        customerID: 2,
        email: 'customer2@email.com',
        password: '<redacted>',
        firstName: 'Gabriel',
        lastName: 'Silvestre',
        avatarURL: 'https://picsum.photos/200/300',
      },
      {
        customerID: 3,
        email: 'customer3@email.com',
        password: '<redacted>',
        firstName: 'Diego',
        lastName: 'Lara',
        avatarURL: 'https://picsum.photos/200/300',
      },
    ],
  })

  await prisma.professional.createMany({
    data: [
      {
        professionalID: 1,
        firstName: 'Sarah',
        lastName: '',
        businessID: 1,
        photoURL: 'https://stylify.ca/cdn/sarah.png',
      },
      {
        professionalID: 2,
        firstName: 'Gabriel',
        lastName: '',
        businessID: 1,
        photoURL: 'https://stylify.ca/cdn/gabriel.png',
      },
    ],
  })

  await prisma.timeSlot.createMany({
    data: [
      {
        timeSlotID: 1,
        professionalID: 1,
        slot: '9:00 AM',
      },
      {
        timeSlotID: 2,
        professionalID: 1,
        slot: '10:00 AM',
      },
      {
        timeSlotID: 3,
        professionalID: 1,
        slot: '12:00 AM',
      },
      {
        timeSlotID: 4,
        professionalID: 1,
        slot: '4:00 PM',
      },
      {
        timeSlotID: 5,
        professionalID: 1,
        slot: '5:00 PM',
      },
      {
        timeSlotID: 6,
        professionalID: 2,
        slot: '8:30 AM',
      },
      {
        timeSlotID: 7,
        professionalID: 2,
        slot: '9:00 AM',
      },
      {
        timeSlotID: 8,
        professionalID: 2,
        slot: '11:00 AM',
      },
      {
        timeSlotID: 9,
        professionalID: 2,
        slot: '3:00 PM',
      },
      {
        timeSlotID: 10,
        professionalID: 2,
        slot: '6:00 PM',
      },
    ],
  })

  await prisma.business.createMany({
    data: [
      {
        businessID: 2,
        email: `business1@email.com`,
        password: '<redacted>',
        businessName: `Barton Salon`,
        businessType: `Hair Salon`,
        description: 'Welcome to Barton Salon, where we make your hair dreams come true!',
        location: `1st Ave`,
      },
      {
        businessID: 1,
        email: `business2@email.com`,
        password: '<redacted>',
        businessName: `Sarah's Salon`,
        businessType: `Hair Salon`,
        description: "Welcome to Sarah's Salon, where we make your hair dreams come true!",
        location: `2nd Ave`,
      },
      {
        businessID: 3,
        email: `business3@email.com`,
        password: '<redacted>',
        businessName: `Golden Locks`,
        businessType: `Hair Salon`,
        description: 'Welcome to Golden Locks, where we make your hair dreams come true!',
        location: `3st Ave`,
      },
    ],
  })

  await prisma.serviceType.createMany({
    data: [
      {
        serviceTypeID: 1,
        serviceType: 'Hair',
      },
      {
        serviceTypeID: 2,
        serviceType: 'Nails',
      },
      {
        serviceTypeID: 3,
        serviceType: 'Beard',
      },
    ],
  })

  await prisma.service.createMany({
    data: [
      {
        serviceName: `Hair Cut`,
        servicePrice: 50,
        serviceTypeID: 1,
        businessID: 1,
        durationInMinutes: 60,
        photoURL: 'https://stylify.ca/cdn/hair.jpeg',
      },
      {
        serviceName: `Nail Extensions`,
        servicePrice: 50,
        serviceTypeID: 2,
        businessID: 1,
        durationInMinutes: 30,
        photoURL: 'https://stylify.ca/cdn/nails.jpeg',
      },
      {
        serviceName: `Beard Trimming`,
        servicePrice: 30,
        serviceTypeID: 3,
        businessID: 1,
        durationInMinutes: 35,
        photoURL: 'https://stylify.ca/cdn/beard.jpeg',
      },
    ],
  })

  await prisma.professionalServices.createMany({
    data: [
      {
        serviceID: 1,
        professionalID: 1,
      },
      {
        serviceID: 2,
        professionalID: 1,
      },
      {
        serviceID: 3,
        professionalID: 1,
      },
      {
        serviceID: 1,
        professionalID: 2,
      },
      {
        serviceID: 2,
        professionalID: 2,
      },
      {
        serviceID: 3,
        professionalID: 2,
      },
    ],
  })

  const pr = genAppointmentsProd(2000, 2, 1, 3).map(async (a) => {
    await prisma.appointment.create({
      data: a,
    })

    // setInterval(()=>{}, 500);
  })

  await Promise.all(pr)

  await prisma.deal.createMany({
    data: [
      {
        serviceID: 1,
        dealAmount: 1,
        price: 10,
        startDate: new Date(),
        endDate: new Date(),
        businessID: 1,
      },
      {
        serviceID: 2,
        dealAmount: 1,
        price: 15,
        startDate: new Date(),
        endDate: new Date(),
        businessID: 1,
      },
      {
        serviceID: 3,
        dealAmount: 1,
        price: 40,
        startDate: new Date(),
        endDate: new Date(),
        businessID: 1,
      },
    ],
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
