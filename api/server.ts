import { jsonSchemaTransform, serializerCompiler, validatorCompiler, type ZodTypeProvider } from 'fastify-type-provider-zod'
import fastify from 'fastify'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'

import appRoutes from './routes/routes'

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000

console.log(process.env.PORT)

const app = fastify()
  .setValidatorCompiler(validatorCompiler)
  .setSerializerCompiler(serializerCompiler)

// Swagger documentation

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'API de Exemplo',
      description: 'Documentação da API de exemplo utilizando Fastify',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
})
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