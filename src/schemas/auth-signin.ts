import { z } from 'zod';
 export const authSignInSchema = z.object({
  email: z.string({ message: 'Campo E-mail é Obrigatório' }).email('E-mail inválido')
});