import { Router } from 'express'
import { prisma } from '../app'

const router = Router()

// POST - Create Record

router.post('/', async (req, res) => {
  const review = await prisma.review.create({
    data: {
      ...req.body,
    },
  })

  res.json(review)
})

// GET - Retrieve Records
router.get('/', async (_, res) => {
  const reviewList = await prisma.review.findMany()

  res.json(reviewList)
})

// GET - Retrieve Record
router.get('/:reviewID', async (req, res) => {
  const { reviewID } = req.params

  const review = await prisma.review.findFirst({
    where: {
      reviewID: Number(reviewID)
    }
  })

  res.json(review)
})

router.get('/byBusiness/:businessID', async (req, res) => {
  const { businessID } = req.params

  const review = await prisma.review.findMany({
    where: {
      businessID: Number(businessID)
    },
    include: {
      appointment: {
        include: {
          customer: true
        }
      }
    }
  })

  res.json(review)
})

// PUT - Update Record
router.put('/:reviewID', async (req, res) => {
  const { reviewID, ...data } = req.body
  const review = await prisma.review.update({
    where: {
      reviewID: Number (reviewID),
    },
    data,
  })

  res.json(review)
})

// DELETE - Delete Record
router.delete('/:reviewID', async (req, res) => {
  const { reviewID } = req.params

  const review = await prisma.review
    .delete({
      where: { reviewID: Number (reviewID) },
    })
    .catch((error) => error)

  res.json(review)
})

export { router as reviewRouter }
