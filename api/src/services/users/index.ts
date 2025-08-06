import { prisma } from '../../prisma'
import type { createUserSchema } from '../../schemas/users'
import { z } from 'zod/v4'

export async function createUser({
    name,
    email,
    password,
    permissions = [],
}: z.infer<typeof createUserSchema>) {
    const createdAt = new Date()
    
    const newUser = await prisma.user.create({
        data: {
            name,
            email,
            password,
            createdAt
        },
    })

    
}
