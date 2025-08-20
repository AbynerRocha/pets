import { FastifyInstance } from 'fastify'

// Import routes

import createUserRoute from './users/create'
import getUserRoute from './users/get'
import getUserTestRoute from './users/test'


export default async function appRoutes(app: FastifyInstance) {
  app.register(createUserRoute, { prefix: '/users' })
  app.register(getUserRoute, { prefix: '/users' })
  app.register(getUserTestRoute, { prefix: '/users' })
}