import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'

export default async function getUserRoute(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get('/', {
        schema: {
            response: {
                201: z.object({
                    name: z.string(),
                })
            }
        }
    }, async (request, reply) => {
        reply.status(201).send({ name: 'John Doe' });
    });
}