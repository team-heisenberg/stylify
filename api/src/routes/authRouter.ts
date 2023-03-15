import 'dotenv'
import { Router } from 'express'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const router = Router()

let accessTokens: any[] = []
let refreshTokens: any[] = []

export function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (!accessTokens.find((a) => a === token)) return res.sendStatus(401)
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || '', (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

router.post('/', async (req, res) => {
  const { email } = req.body
  console.log(email)
  const result: any[] = await prisma.$queryRawUnsafe(
    `SELECT c.customerID  as ID, c.email as Email, CONCAT(c.firstName, " ", c.lastName) as Name, "1" as IsCustomer   FROM Customer c
  WHERE c.email = ?
  UNION
  SELECT b.businessID  as ID, b.email as Email, b.businessName  as Name, "0" as IsCustomer   FROM Business b 
  WHERE b.email = ?`,
    email,
    email
  )

  if (result?.length === 0) {
    res.status(400).end()
    return
  }

  // @ts-ignore
  const user = result[0]

  const newAccessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET || '')
  accessTokens.push(newAccessToken)
  const newRefreshToken: any = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET || '')
  refreshTokens.push(newRefreshToken)
  res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken, userData: result[0] })
})

router.delete('/', (req, res) => {
  accessTokens = accessTokens.filter((token) => token !== req.body.token)
  res.sendStatus(204)
})

export { router as authRouter }
