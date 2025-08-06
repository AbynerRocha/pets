import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { permission } from "process"
import { z } from "zod/v4"
import { createUserSchema } from "../../src/schemas/users"

export default async function createUserRoute(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post('/', {
        schema: {
            body: createUserSchema,
            response: {
                200: z.object({
                    id: z.number() 
                })
            }
        },
        
    }, async (request, reply) => {

    })
}