import { jsonSchemaTransform, serializerCompiler, validatorCompiler, type ZodTypeProvider } from 'fastify-type-provider-zod'
import fastify from 'fastify'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'

import appRoutes from './routes/routes'

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000

const app = fastify()
.setValidatorCompiler(validatorCompiler)
.setSerializerCompiler(serializerCompiler)

// Register routes
app.register(appRoutes)

// Swagger documentation

app.register(fastifySwagger, {
    openapi: {
        info: {
            title: "API from Pets Project",
            description: "API for managing pets, users, and permissions.",
            version: "1.0.0"
        },
    },
    transform: jsonSchemaTransform
})

app.register(fastifySwaggerUI, {
    routePrefix: '/docs',
})


app.listen({ port }, (err, address) => {
  if (err) {
    console.error(err)
  }
  console.log(`Server listening at ${address}`)
})