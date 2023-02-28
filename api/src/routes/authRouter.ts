import 'dotenv'
import { Router } from 'express'
import jwt from 'jsonwebtoken'

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

router.post('/', (req, res) => {
  const { businessName, firstName, lastName, businessID, customerID } = req.body
  const user = { name: businessName ? businessName : `${firstName} ${lastName}`, ID: businessID ?? customerID }

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET || '')
  accessTokens.push(accessToken)
  const refreshToken: any = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET || '')
  refreshTokens.push(refreshToken)
  res.json({ accessToken: accessToken, refreshToken: refreshToken })
})

router.delete('/', (req, res) => {
  accessTokens = accessTokens.filter((token) => token !== req.body.token)
  res.sendStatus(204)
})

export { router as authRouter }
