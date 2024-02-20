import { z } from 'zod';

export const userCreationSchema = z.object({
  name: z.string().min(3, { message: 'Nome deve ter no mínimo 3 caracteres' }),
  email: z.string().email({ message: 'Email inválido' }),
  password: z.string().min(6, { message: 'Senha deve ter no mínimo 6 caracteres' }),
  phone: z.string().min(11).max(11, { message: 'Telefone inválido' }),
  image: z.string().optional(),
});

export const adminCreationSchema = z.object({
  name: z.string().min(3, { message: 'Nome deve ter no mínimo 3 caracteres' }),
  email: z.string().email({ message: 'Email inválido' }),
  password: z.string().min(6, { message: 'Senha deve ter no mínimo 6 caracteres' }),
  phone: z.string().min(11).max(11, { message: 'Telefone inválido' }),
  image: z.string().optional(),
  tokenAdmin: z.string().min(6, { message: 'Token de administrador inválido' }),
});
