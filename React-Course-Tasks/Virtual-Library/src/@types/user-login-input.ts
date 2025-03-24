import { z } from "zod";
import userSchema from "../schemas/userLoginSchema";

export type UserLoginInput = z.infer<typeof userSchema>;
