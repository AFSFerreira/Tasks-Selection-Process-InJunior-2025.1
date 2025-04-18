import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
    NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
    PORT: z.coerce.number().default(3333),
    HASH_NUMBER_TIMES: z.coerce.number().min(6).max(12).default(10)
});

const _env = envSchema.safeParse(process.env);
const errorMessage = "Invalid Environment Variables";

if (!_env.success) {
    console.error(errorMessage, _env.error.format());
    throw new Error(errorMessage);
}

export const env = _env.data;
