import { z } from "zod/v4";
import { createPermissionSchema } from "../../schemas/permissions";
import { prisma } from "../../prisma";

export async function createPermission({ name }: z.infer<typeof createPermissionSchema>) {
    try {
        const createdAt = new Date();

        const newPermission = await prisma.permission.create({
            data: {
                name,
                createdAt,
            },
        });
    
        return newPermission; 
    } catch (error) {
        throw new Error(`Failed to create permission: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}

export async function getPermissionById(id: number) {
    const permission = await prisma.permission.findUnique({
        where: {
            id,
        },
    });
    return permission;
}

export async function getPermissionByName(name: string) {
    const permission = await prisma.permission.findFirst({
        where: {
            name,
        },
    });
    return permission;
}
