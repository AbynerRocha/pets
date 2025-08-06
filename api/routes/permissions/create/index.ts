import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import { z } from "zod/v4"
import { createPermissionSchema } from "../../../src/schemas/permissions"
import { createPermission, getPermissionByName } from "../../../src/services/permissions"

export default async function createPermissionRoute(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post('/', {
        schema: {
            body: createPermissionSchema,
            response: {
                400: z.object({
                    error: z.string(),
                }),
                404: z.object({
                    error: z.string(),
                }),
                200: z.object({
                    id: z.number()
                })
            },
            description: 'Create a new permission',
        },
        

    }, async (request, reply) => {
        if (!request.body) {
            return reply.status(400).send({ error: 'Invalid request body' });
        }

        if (!request.body.name) {
            return reply.status(400).send({ error: 'Permission name is required' });
        }

        try {
            const { name } = request.body

            if (getPermissionByName(name) !== null) {
                return reply.status(400).send({ error: `Permission with name "${name}" already exists.`});
            }

            const newPermission = await createPermission({ name });

            if(!newPermission) {
                return reply.status(400).send({ error: 'Permission could not be created.' });
            }
            
            return reply.status(200).send({ id: newPermission.id });
        } catch (error) {
            console.error('Error creating permission:', error);
            return reply.status(500).send({ error: 'Internal server error' });
        }
    })
}