import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(["dev", "test", "production"]).default("dev"),
  PORT: z.coerce.number().default(3333),
  JWT_SECRET: z.string().min(5),
  HASH_NUMBER_TIMES: z.coerce.number().min(8).max(12).default(10),
  NODEMAILER_EMAIL: z.string().nonempty().email(),
  NODEMAILER_EMAIL_PASS: z.string().nonempty(),
});

const _env = envSchema.safeParse(process.env);
const errorMessage = "Invalid environment variables";

if (!_env.success) {
    console.error(errorMessage, _env.error.format());
    throw new Error(errorMessage);
}

export const env = _env.data;
