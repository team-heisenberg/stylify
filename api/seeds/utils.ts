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

  for (let i = 1; i <= n; i++) {
    const bId = b[Math.floor(Math.random() * b.length)]
    arr.push({
      customerID: c[Math.floor(Math.random() * c.length)],
      businessID: bId,
      professionalID: p[Math.floor(Math.random() * p.length)],
      isConfirmed: true,
      appointmentDateTime: new Date(new Date(2023, 0, 1).getTime() + Math.random() * (new Date().getTime() - new Date(2023, 0, 1).getTime())),
      appointmentType: AppointmentType[aType[Math.floor(Math.random() * aType.length)]],
      reviews: {
        create: {
          reviewDetails: `Review ${i}`,
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
