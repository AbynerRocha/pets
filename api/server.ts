import { jsonSchemaTransform, serializerCompiler, validatorCompiler, type ZodTypeProvider } from 'fastify-type-provider-zod'
import fastify from 'fastify'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'

import appRoutes from './routes/routes'

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000

const app = fastify()
  .setValidatorCompiler(validatorCompiler)
  .setSerializerCompiler(serializerCompiler)

  
// Swagger documentation

app.register(fastifySwagger)
app.register(fastifySwaggerUI, {
  routePrefix: '/docs',
})
  
// Register routes
app.register(appRoutes)

app.listen({ port }, (err, address) => {
  if (err) {
    console.error(err)
  }
  console.log(`Server listening at ${address}`)
})