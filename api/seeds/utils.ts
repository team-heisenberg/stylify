import { AppointmentType } from '@prisma/client'

export const genCustomers = (n: number) => {
  const arr: any[] = []
  for (let i = 1; i <= n; i++) {
    arr.push({
      customerID: i,
      email: `test${i}@email.com`,
      password: 'password1',
      firstName: `Customer ${i}`,
      lastName: 'Test',
      avatarURL: 'https://picsum.photos/200/300',
    })
  }

  return arr
}

export const genProfessionals = (n: number, businesses: Array<number>) => {
  const arr: any[] = []
  for (let i = 1; i <= n; i++) {
    arr.push({
      professionalID: i,
      firstName: 'Joe',
      lastName: `Doe ${i}`,
      businessID: businesses[Math.floor(Math.random() * businesses.length)],
    })
  }

  return arr
}

export const genTimeSlots = (n: number, professionals: Array<number>) => {
  const slots = [
    '8:00 AM',
    '9:00 AM',
    '10:00 AM',
    '11:00 AM',
    '1:00 PM',
    '2:00 PM',
    '3:00 PM',
    '4:00 PM',
    '5:00 PM',
    '6:00 PM',
    '7:00 PM',
    '8:00 PM',
  ]
  const arr: any[] = []
  let id = 1
  for (let i = 1; i <= n; i++) {
    const slotsToCreate = Math.floor(Math.random() * (slots.length + 1 - 1)) + 1

    for (let l = 0; l < slotsToCreate; l++) {
      arr.push({
        timeSlotID: id,
        professionalID: professionals[Math.floor(Math.random() * professionals.length)],
        slot: slots[l],
      })

      id++
    }
  }

  return arr
}

export const genBusinesses = (n: number) => {
  const arr: any[] = []
  for (let i = 1; i <= n; i++) {
    arr.push({
      email: `testbusiness${i}@mail.com`,
      password: `password1`,
      businessName: `Salon ${i}`,
      businessType: `Hair Salon`,
      description: `Have your hair cut`,
      location: `Ave ${i}`,
    })
  }

  return arr
}

export const genServiceTypes = (n: number) => {
  const services = ['Hair', 'Nails', 'Beard', 'Hydration', 'Makeup']
  const arr: any[] = []
  for (let i = 1; i <= n; i++) {
    arr.push({
      serviceTypeID: i,
      serviceType: services[Math.floor(Math.random() * services.length)],
    })
  }

  return arr
}

export const genServices = (n: number, serviceTypes: Array<number>, businesses: number) => {
  const services = ['Hair', 'Nails', 'Beard', 'Hydration', 'Makeup']
  const b = Array.from({ length: businesses }, (_, i) => i + 1)

  const arr: any[] = []
  for (let i = 1; i <= n; i++) {
    arr.push({
      serviceName: `${services[Math.floor(Math.random() * services.length)]} ${i}`,
      servicePrice: 10 * i,
      serviceTypeID: serviceTypes[Math.floor(Math.random() * serviceTypes.length)],
      businessID: b[Math.floor(Math.random() * b.length)],
      durationInMinutes: Math.floor(Math.random() * (60 - 10)) + 10,
    })
  }

  return arr
}

export const genProfessionalServices = (n: number, professionals: Array<number>) => {
  const arr: any[] = []
  for (let i = 1; i <= n; i++) {
    arr.push({
      serviceID: i,
      professionalID: professionals[Math.floor(Math.random() * professionals.length)],
    })
  }

  return arr
}

export const genAppointments = (n: number, professionals: number, businesses: number, customers: number) => {
  const p = Array.from({ length: professionals }, (_, i) => i + 1)
  const b = Array.from({ length: businesses }, (_, i) => i + 1)
  const c = Array.from({ length: customers }, (_, i) => i + 1)
  const aType = ['ONLINE', 'CALL', 'WALKIN']
  const arr: any[] = []
  const reviewsText = [
    'Amazing haircuts and friendly service! Love the trendy vibe of this salon!',
    'My go-to salon for hair color! Always satisfied with the results and the staff is so welcoming.',
    'Great salon experience from start to finish. Talented stylists, relaxing ambiance, and impeccable service.',
    'Finally found a salon that understands my curly hair! Perfect cut and styling every time.',
    'Highly recommend this salon! Skilled stylists, top-notch products, and a fantastic atmosphere.',
    'Best salon in town! The attention to detail and personalized service are unbeatable.',
    'Loved my balayage at this salon! The color is exactly what I wanted. Will be coming back for sure!',
    'Excellent salon with a modern touch. The stylists are knowledgeable and make you feel pampered.',
    'Impressed with the professionalism and creativity of the stylists. Left with a gorgeous haircut!',
    'A gem of a salon! The staff is skilled and friendly, and the salon has a chic and relaxing ambiance.',
  ]

  for (let i = 1; i <= n; i++) {
    const bId = b[Math.floor(Math.random() * b.length)]
    arr.push({
      customerID: c[Math.floor(Math.random() * c.length)],
      businessID: bId,
      professionalID: p[Math.floor(Math.random() * p.length)],
      isConfirmed: true,
      appointmentDateTime: new Date(
        new Date(2023, 0, 1).getTime() + Math.random() * (new Date().getTime() - new Date(2023, 0, 1).getTime())
      ),
      appointmentType: AppointmentType[aType[Math.floor(Math.random() * aType.length)]],
      reviews: {
        create: {
          reviewDetails: reviewsText[Math.floor(Math.random() * (reviewsText.length - 0 + 1)) + 0],
          appointmentRating: Math.floor(Math.random() * (5 - 1 + 1) + 1),
        },
      },
      appointmentDetails: {
        connectOrCreate: {
          where: {
            appointmentDetailsID: i,
          },
          create: {
            serviceID:
              bId <= 5 ? Math.floor(Math.random() * (5 - 1 + 1) + 1) : Math.floor(Math.random() * (10 - 5 + 1) + 5),
            price: 0.5 * Math.floor(Math.random() * (100 - 1 + 1) + 1),
          },
        },
      },
    })
  }

  return arr
}

export const genAppointmentsProd = (n: number, professionals: number, businesses: number, customers: number) => {
  const p = Array.from({ length: professionals }, (_, i) => i + 1)
  const c = Array.from({ length: customers }, (_, i) => i + 1)
  const aType = ['ONLINE', 'CALL', 'WALKIN']
  const arr: any[] = []
  const reviewsText = [
    'Amazing haircuts and friendly service! Love the trendy vibe of this salon!',
    'My go-to salon for hair color! Always satisfied with the results and the staff is so welcoming.',
    'Great salon experience from start to finish. Talented stylists, relaxing ambiance, and impeccable service.',
    'Finally found a salon that understands my curly hair! Perfect cut and styling every time.',
    'Highly recommend this salon! Skilled stylists, top-notch products, and a fantastic atmosphere.',
    'Best salon in town! The attention to detail and personalized service are unbeatable.',
    'Loved my balayage at this salon! The color is exactly what I wanted. Will be coming back for sure!',
    'Excellent salon with a modern touch. The stylists are knowledgeable and make you feel pampered.',
    'Impressed with the professionalism and creativity of the stylists. Left with a gorgeous haircut!',
    'A gem of a salon! The staff is skilled and friendly, and the salon has a chic and relaxing ambiance.',
  ]

  for (let i = 1; i <= n; i++) {
    const bId = 1
    const dte = new Date().toDateString()
    const slots = [
      '8:00 AM',
      '9:00 AM',
      '10:00 AM',
      '11:00 AM',
      '1:00 PM',
      '2:00 PM',
      '3:00 PM',
      '4:00 PM',
      '5:00 PM',
      '6:00 PM',
      '7:00 PM',
      '8:00 PM',
    ]
    
    arr.push({
      customerID: c[Math.floor(Math.random() * c.length)],
      businessID: bId,
      professionalID: p[Math.floor(Math.random() * p.length)],
      isConfirmed: true,
      dateAndTime: `${dte} ${slots[Math.floor(Math.random() * slots.length)]}`,
      appointmentDateTime: new Date(
        new Date(2023, 0, 1).getTime() + Math.random() * (new Date().getTime() - new Date(2023, 0, 1).getTime())
      ),
      appointmentType: AppointmentType[aType[Math.floor(Math.random() * aType.length)]],
      reviews: {
        connectOrCreate: {
          where: {
            reviewID: i + 1,
          },
          create: {
            reviewDetails: reviewsText[Math.floor(Math.random() * reviewsText.length)],
            appointmentRating: Math.floor(Math.random() * (5 - 1 + 1) + 1),
            business: {
              connect: {
                businessID: 1,
              },
            },
          },
        },
      },
      appointmentDetails: {
        connectOrCreate: {
          where: {
            appointmentDetailsID: i,
          },
          create: {
            serviceID: Math.floor(Math.random() * (5 - 1 + 1) + 1),
            price: 0.5 * Math.floor(Math.random() * (100 - 30 + 1) + 30),
          },
        },
      },
    })
  }

  return arr
}
