import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const router = Router()

// POST - Create Record
router.post('/', async (req, res) => {
  const serviceType = await prisma.serviceType.create({
    data: {
      ...req.body,
    },
  })

  res.json(serviceType)
})

// GET - Retrieve Records
router.get('/', async (_, res) => {
  const serviceTypeList = await prisma.serviceType.findMany()

  res.json(serviceTypeList)
})

router.get('/servicetypebybusiness/:businessID', async (req, res) => {
  const { businessID } = req.params
  const serviceTypeList = await prisma.serviceType.findMany({
    select: {
      serviceTypeID: true,
      serviceType:true,
      services: {
        where: {
          businessID: Number(businessID)
        }
      }
     }    
  })

  res.json(serviceTypeList)
})

// GET - Retrieve Record
router.get('/:serviceTypeID', async (req, res) => {
  const { serviceTypeID } = req.params

  const serviceType = await prisma.serviceType.findFirst({
    where: {
      serviceTypeID: Number(serviceTypeID),
    },
  })

  res.json(serviceType)
})

// PUT - Update Record
router.put('/:serviceTypeID', async (req, res) => {
  const { serviceTypeID, ...data } = req.body
  const test = await prisma.serviceType.update({
    where: {
      serviceTypeID: Number(serviceTypeID),
    },
    data,
  })

  res.json(test)
})

// DELETE - Delete Record
router.delete('/:serviceTypeID', async (req, res) => {
  const { serviceTypeID } = req.params

  const test = await prisma.serviceType
    .delete({
      where: { serviceTypeID: Number(serviceTypeID) },
    })
    .catch((error) => error)

  res.json(test)
})

export { router as serviceTypeRouter }
