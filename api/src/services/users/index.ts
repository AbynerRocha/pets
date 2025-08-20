import { prisma } from '../../prisma'
import type { createUserSchema } from '../../schemas/users'
import { z } from 'zod/v4'
import { getPermissionByName } from '../permissions'

export async function createUser({
    name,
    email,
    password,
    permission,
}: z.infer<typeof createUserSchema>) {
    const createdAt = new Date()

    try {
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password,
                createdAt
            },
        })

        if (!newUser) {
            throw new Error('Failed to create user. Please try again.');
        }

        if (permission && permission !== null) {
            permission.permissions?.forEach(async perm => {
                const permissionExists = await getPermissionByName(perm)

                if (!permissionExists) {
                    throw new Error(`Permission "${perm}" does not exist.`);
                }

                await giveUserPermission(newUser.id, permissionExists.id, permission.gaveBy);
            })
        }

        return newUser.id;
    } catch (error) {
        throw new Error(`Failed to create user: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}

export async function getUserById(id: number) {
    const user = await prisma.user.findUnique({
        where: { id },
        include: {
            UserPermission: {
                include: {
                    permission: {
                        select: {
                            id: false,
                            name: true
                        }
                    },
                },
                omit: {
                    id: true,
                    userId: true,
                    permissionId: true,
                }
            }
        },
        omit: {
            password: true,
        }
    })

    return user ? {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        permissions: user.UserPermission.map(up => up.permission.name)
    } : null
}

export async function getUserByEmail(email: string) {
    const user = await prisma.user.findFirst({
        where: { email },
        include: {
            UserPermission: {
                include: {
                    permission: {
                        select: {
                            id: false,
                            name: true
                        }
                    },
                },
                omit: {
                    id: true,
                    userId: true,
                    permissionId: true,
                }
            }
        },
        omit: {
            password: true,
        }
    })

    return user ? {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        permissions: user.UserPermission.map(up => up.permission.name)
    } : null
}

export async function getUserByName(name: string) {
    const user = await prisma.user.findFirst({
        where: { name },
        include: {
            UserPermission: {
                include: {
                    permission: {
                        select: {
                            id: false,
                            name: true
                        }
                    },
                },
                omit: {
                    id: true,
                    userId: true,
                    permissionId: true,
                }
            }
        },
        omit: {
            password: true,
        }
    })

    return user ? {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        permissions: user.UserPermission.map(up => up.permission.name)
    } : null
}

// Permissions

export async function giveUserPermission(userId: number, permissionId: number, gaveBy?: number) {
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
            permission: true,

        },
    })
}

export async function hasUserPermission(userId: number, permission: string) {
    return !! await prisma.userPermission.findFirst({
        where: {
            userId,
            permission: {
                name: permission
            }
        },
    })
}

export async function removeUserPermission(userId: number, permission: string) {
    return await prisma.userPermission.deleteMany({
        where: {
            userId,
            permission: {
                name: permission
            }
        },
    })
}