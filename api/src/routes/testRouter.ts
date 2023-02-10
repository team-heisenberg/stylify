import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const router = Router()

// POST - Create Record
// router.post('/', async (req, res) => {
//   const test = await prisma.test.create({
//     data: {
//       ...req.body,
//     },
//   })

//   res.json(test)
// })

// // GET - Retrieve Records
// router.get('/', async (_, res) => {
//   const testList = await prisma.test.findMany()

//   res.json(testList)
// })

// // PUT - Update Record
// router.put('/', async (req, res) => {
//   const { id, ...data } = req.body
//   const test = await prisma.test.update({
//     where: {
//       id,
//     },
//     data,
//   })

//   res.json(test)
// })

// // DELETE - Delete Record
// router.delete('/:id', async (req, res) => {
//   const { id } = req.params

//   const test = await prisma.test
//     .delete({
//       where: { id },
//     })
//     .catch((error) => error)

//   res.json(test)
// })

export { router as testRouter }
