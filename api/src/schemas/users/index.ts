import { z } from 'zod/v4'

export const createUserSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    permission: z.object({
        gaveBy: z.number().optional(),
        permissions: z.array(z.string()).optional(),
    }),
    createdBy: z.number().optional(),
});

export function userSchema() {
    return z.object({
        id: z.number().int().positive(),
        name: z.string(),
        email: z.string().email(),
        createdAt: z.date(),
        updatedAt: z.date().optional(),
        permissions: z.array(z.string()).optional(), // Assuming permissions are strings
    });
}