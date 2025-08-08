import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from "zod/v4"
import { createUserSchema } from "../../src/schemas/users"
import { createUser, getUserByEmail } from "../../src/services/users"

export default async function createUserRoute(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post('/', {
        schema: {
            tags: ['create'],
            summary: 'Create user',
            description: 'Route to create a new user',
            body: createUserSchema,
            response: {
                200: z.object({
                    id: z.number() 
                }),
                400: z.object({ error: z.string(), message: z.string().optional() }),
                401: z.object({ error: z.string(), message: z.string().optional() }),
                500: z.object({ error: z.string(), message: z.string().optional() }),
            },
        },
        
    }, async (request, reply) => {
        try {
            const { name, email, password } = request.body

            const thisUserExists = await getUserByEmail(email)

            if(thisUserExists) {
                return reply.status(400).send({ 
                    error: "User already exists",
                    message: "Este email já está sendo utilizado."
                })
            }

            const newUser = await createUser({
                name,
                email,
                password,
            })
            
            if (!newUser) {
                return reply.status(400).send({ 
                    error: "User creation failed",
                    message: "Não foi possível criar este usuário nesse momento."
                })
            }

            return reply.status(200).send({
                id: newUser.id
            })
        } catch (error) {
            console.error(error)

            reply.status(500).send({ 
                error: error.message,
                message: "Não foi possível criar este usuário nesse momento."
            }) 
        }
    })
}