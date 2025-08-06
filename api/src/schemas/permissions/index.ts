import { z } from "zod/v4";

export const createPermissionSchema = z.object({
    name: z.string().min(1, "Name is required"),
})

export const permissionSchema = z.object({
    id: z.number(),
    name: z.string(),
    createdAt: z.date(),
})

