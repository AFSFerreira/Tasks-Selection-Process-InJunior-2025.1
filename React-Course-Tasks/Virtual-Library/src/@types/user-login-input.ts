import { z } from "zod";
import userSchema from "../schemas/userLoginSchema";

type UserLoginInput = z.infer<typeof userSchema>;

export default UserLoginInput;
