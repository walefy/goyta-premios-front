import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { GoytaBackend } from '@/entities/GoytaBackend';
import { adminCreationSchema } from '@/schemas/userCreationSchema';
import { AdminCreation } from '@/types/UserCreation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const backend = new GoytaBackend();

export function CreateAdminAccount() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const form = useForm<AdminCreation>({
    resolver: zodResolver(adminCreationSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      phone: '',
      image: '',
      tokenAdmin: '',
    },
  });

  const onSubmit = async (values: AdminCreation) => {
    const loginResult = await backend.createAdminAccount(values);
    
    if (!loginResult.success) {
      toast({ variant: 'destructive', title: 'Erro', description: loginResult.data, duration: 3000 });
      return;
    }

    window.sessionStorage.setItem('token', loginResult.data); // TODO: use a better way to store the token
    navigate('/home');
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col w-3/5 lg:w-2/5 gap-2'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type='text' placeholder='nome' {...field} />              
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='phone'
          render={({ field }) => (
            <FormItem>
              <FormControl>
              <Input type='tel' placeholder='(99) 99999-9999' {...field} />           
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type='email' placeholder='email@email.com' {...field} />              
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type='password' placeholder='********' {...field} />              
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='tokenAdmin'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type='password' placeholder='convite do administrador' {...field} />              
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit'>Criar</Button>
      </form>
    </Form>
  );
}
