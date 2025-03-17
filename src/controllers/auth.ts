import { RequestHandler } from "express";
import { authSignInSchema } from "../schemas/auth-signin";
import { createUser, getUserByEmail } from "../services/user";
import { generateOTP, validateOTP } from "../services/otp";
import { sendEmail } from "../libs/mailtrap";
import { authSignUpSchema } from "../schemas/auth-signup";
import { authUseOTPSchema } from "../schemas/auth-useotp";
import { createJWT } from "../libs/jwt";

export const signin: RequestHandler = async (req, res) => {
  //Validar os dados Recebidos
  const data = authSignInSchema.safeParse(req.body);
  if (!data.success) {
    res.status(400).json({ error: data.error.flatten().fieldErrors });
    return;
  }

  //Verificar se o usuário existe (baseado no E-mail)
  const user = await getUserByEmail(data.data.email);
  if (!user) {
    res.json({ error: 'Usuário não encontrado' });
    return;
  }

  //Criando um código OTP para este Usuário e slavando no banco tambem 
  const otp = await generateOTP(user.id);


  //Enviar um -email para o Usuário com o código OTP
  await sendEmail(
    user.email,
    'Seu codigo de acesso é: ' + otp.code,
    'Digite seu codigo: ' + otp.code
  )

  //Devolver o ID do código OTP gerado
  res.json({ id: otp.id });
};

export const signup: RequestHandler = async (req, res) => {
  // Validar os dados Recebidos
  const data = authSignUpSchema.safeParse(req.body);
  if (!data.success) {
    res.status(400).json({ error: data.error.flatten().fieldErrors });
    return;
  }

  // Verificar se o usuário já existe (baseado no E-mail)
  const user = await getUserByEmail(data.data.email);
  if (user) {
    res.json({ error: 'Usuário já existe com esse E-mail' });
    return;
  }

  // Criar um novo usuário
  const newUser = await createUser(data.data.name, data.data.email);

  // Retornar o novo usuário criado
  res.status(201).json({ user: newUser });
};

export const useOTP: RequestHandler = async (req, res) => {
  // Validar os dados Recebidos
  const data = authUseOTPSchema.safeParse(req.body);
  if (!data.success) {
    res.status(400).json({ error: data.error.flatten().fieldErrors });
    return;
  }

  // Validar o OTP
  const user = await validateOTP(data.data.id, data.data.code);
  if(!user) {
    res.json({ error: 'OTP inválido ou expirado.' })
    return;
  }

  // Criar o JWT
  const token = createJWT(user.id);

  // Devolver o JWT
  res.json({ token, user });
};