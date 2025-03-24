import { z } from "zod";

const userSchema = z.object({
  password: z.string().nonempty().min(6),
  email: z.string().nonempty().email()
});

export default userSchema;
