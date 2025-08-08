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

export async function getUserById(id: number) {
    return await prisma.user.findUnique({
        where: { id },
        omit: {
            password: true, 
        }
    })
}

export async function getUserByEmail(email: string) {
    return await prisma.user.findUnique({
        where: { email },
        omit: {
            password: true, 
        }
    })
}

export async function getUserByName(name: string) {
    return await prisma.user.findFirst({
        where: { name },
        omit: {
            password: true, 
        }
    })
}

// Permissions

export function giveUserPermission(userId: number, permissionId: number, gaveBy?: number) {
    return prisma.userPermission.create({
        data: {
            userId,
            permissionId,
            gaveAt: new Date(),
            gaveBy: gaveBy ?? 0, // Assuming 0 is a placeholder for the user who granted the permission
        },
    })
}

export async function getUserPermissions(userId: number, withGaveDetails = false) {
    return await prisma.userPermission.findMany({
        where: { userId },
        include: {
            permission: true, // Include the permission de
        },
    })
}

export async function hasUserPermission(userId: number, permissionId: number) {
    return await prisma.userPermission.findFirst({
        where: {
            userId,
            permissionId
        },
    }).then(permission => !!permission);
}

export async function removeUserPermission(userId: number, permissionId: number) {
    return await prisma.userPermission.deleteMany({
        where: {
            userId,
            permissionId
        },
    })
}