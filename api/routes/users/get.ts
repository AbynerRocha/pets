import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { getUserByEmail, getUserById, getUserByName } from '../../src/services/users';
import { userSchema } from '../../src/schemas/users';

export default async function createUserRoute(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get('/:id', {
        schema: {
            params: z.object({
                id: z.coerce.number().int().positive({ error: 'ID must be a positive integer' }),
            }),
            response: {
                400: z.object({ success: z.boolean(), error: z.string() }),
                404: z.object({ success: z.boolean(), error: z.string() }),
                200: z.object({
                    success: z.boolean(),
                    user: z.object({ 
                        id: z.number().int().positive(),
                        name: z.string(),
                        email: z.email(),
                        createdAt: z.date(),
                        updatedAt: z.date().optional(),
                        permissions: z.array(z.string()) // Assuming permissions are strings
                    }),
                }),
            },
        },
    }, async (request, reply) => {
        const { id } = request.params as { id: number }
        const user = await getUserById(id)

        if (!user) {
            return reply.status(404).send({ success: false, error: 'User not found' })
        }

        return reply.status(200).send({ success: true, user })
    });
}
