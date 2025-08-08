import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'
import { getUserByEmail, getUserById, getUserByName } from '../../src/services/users';

export default async function getUserRoute(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get('/', {
        schema: {
            tags: ['get'],
            summary: 'Get user',
            description: 'Route to get user information',
            querystring: z.object({
                i: z.number().optional(), // User ID
                nm: z.string().optional(), // User Name
                em: z.string().email().optional(), // User Email
            }),
            response: {
                200: z.any(),
                400: z.object({ error: z.string() }),
                404: z.object({ error: z.string() }),
                500: z.object({ error: z.string() }),
            }
        }
    }, async (request, reply) => {
        if(!request.query) {
            return reply.status(400).send({ error: 'Query parameters are required' });
        }

        try {
            if(request.query.i !== undefined && request.query.i !== null) {
                const user = getUserById(request.query.i)
    
                if(!user) {
                    return reply.status(404).send({ error: 'User not found' });
                }
    
                return reply.status(201).send({ user });
            } else if(request.query.nm !== undefined && request.query.nm !== null) {
                const user = await getUserByName(request.query.nm);
    
                if(!user) {
                    return reply.status(404).send({ error: 'User not found' });
                }
    
                return reply.status(201).send({ user });
            } else if(request.query.em !== undefined && request.query.em !== null) {
                const user = await getUserByEmail(request.query.em);
    
                if(!user) {
                    return reply.status(404).send({ error: 'User not found' });
                }
    
                return reply.status(201).send({ user });
            }
        } catch (error) {
            console.error('Error fetching user:', error);
            return reply.status(500).send({ error: 'Internal server error' });
        }
    });
}