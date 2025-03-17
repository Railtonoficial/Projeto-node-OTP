import { z } from "zod";

export const authUseOTPSchema = z.object({
  id: z.string({ message: 'Campo id é Obrigatório' }),
  code: z.string({ message: 'OTP Obrigatório '}).length(6, { message: 'Código precisa ter 6 números' }),
});