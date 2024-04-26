import { z } from "zod";

export const registerSchema = z.object({
    username: z
    .string({
        required_error: 'Introduce tu nombre de usuario'
    }),
    email: z
    .string({
        required_error: 'Introduce tu email'
    })
    .email({
        message: 'Email inválido'
    }),
    password: z
    .string({
        required_error: 'Introduce tu contraseña'
    })
    .min(6, {
        message: 'La contraseña debe de tener al menos 6 caracteres'
    })
});

export const loginSchema = z.object({
    email: z
    .string({
        required_error: 'Introduce tu email'
    })
    .email({
        message: 'Email inválido'
    }),
    password: z
    .string({
        required_error: 'Introduce tu contraseña'
    })
});