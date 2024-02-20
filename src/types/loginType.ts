import { loginSchema } from '@/schemas/loginSchema';
import { z } from 'zod';

export type loginType = z.infer<typeof loginSchema>;