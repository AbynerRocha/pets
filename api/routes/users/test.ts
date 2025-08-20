import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { getUserByEmail, getUserById, getUserByName, hasUserPermission } from '../../src/services/users';
import { userSchema } from '../../src/schemas/users';

export default async function getUserTestRoute(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get('/test/:id', {
        schema: {
            params: z.object({
                id: z.coerce.number().int().positive({ error: 'ID must be a positive integer' }),
            }),
            response: {
                400: z.any(),
                404: z.any(),
                200: z.any()
            },
        },
    }, async (request, reply) => {
        const { id } = request.params as { id: number }
        
        if(await hasUserPermission(id, 'manage_users')) return reply.status(400).send({ success: false, error: 'User already has test permission' });

        return reply.status(200).send({ success: false, error: 'User does not have test permission' });
    });
}
