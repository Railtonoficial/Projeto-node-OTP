import { z } from "zod";

export const authSignUpSchema = z.object({
  name: z.string({ message: 'Campo name é Obrigatório' }),
  email: z.string({ message: 'Campo email é Obrigatório' }).email({ message: 'Campo E-mail é inválido' }),
});
  