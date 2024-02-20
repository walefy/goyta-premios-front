import { userCreationSchema } from '@/schemas/userCreationSchema';
import { z } from 'zod';

export type UserCreation = z.infer<typeof userCreationSchema>;
