import express from 'express'
import cors from 'cors'
import { Prisma, PrismaClient } from '@prisma/client'
import { createPrismaRedisCache } from 'prisma-redis-middleware'
import RedisClient from './shared/redis'


const app = express()
const prisma = new PrismaClient()
const redis = RedisClient.getInstance()

// Set Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (_, res) => {
  res.send('stylify API')
})

// Set Cache
const cacheMiddleware: Prisma.Middleware = createPrismaRedisCache({
  models: [
    { model: "User", excludeMethods: ["findMany"] },
    { model: "Post", cacheTime: 180, cacheKey: "article" },
  ],
  storage: { type: "redis", options: { client: redis, invalidation: { referencesTTL: 300 }, log: console } },
  cacheTime: 300,
  excludeMethods: ["count", "groupBy"],
  onHit: (key) => {
    console.log("hit", key);
  },
  onMiss: (key) => {
    console.log("miss", key);
  },
  onError: (key) => {
    console.log("error", key);
  },
});

prisma.$use(cacheMiddleware);

export { app, prisma }
