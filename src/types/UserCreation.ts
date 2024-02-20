import { adminCreationSchema, userCreationSchema } from '@/schemas/userCreationSchema';
import { z } from 'zod';

export type UserCreation = z.infer<typeof userCreationSchema>;
export type AdminCreation = z.infer<typeof adminCreationSchema>;
