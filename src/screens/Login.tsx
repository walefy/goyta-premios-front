import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { GoytaBackend } from '@/entities/GoytaBackend';
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from 'react-router-dom';
import { loginSchema } from '@/schemas/loginSchema';
import { loginType } from '@/types/loginType';
import { useContext } from 'react';
import { UserContext } from '@/context/UserContext';

const backend = new GoytaBackend();

export function Login() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { fetchUser } = useContext(UserContext);

  const form = useForm<loginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  
  const onSubmit = async (values: loginType) => {
    const loginResult = await backend.login(values.email, values.password);
    
    if (!loginResult.success) {
      toast({ variant: 'destructive', title: 'Erro', description: loginResult.data, duration: 3000 });
      return;
    }

    window.sessionStorage.setItem('token', loginResult.data); // TODO: use a better way to store the token
    await fetchUser(loginResult.data);
    navigate('/home');
  };

  return (
    <div className='flex flex-col gap-y-20 justify-center items-center w-full h-screen'>
      <h1 className="text-4xl font-extrabold leading-tighter flex items-center space-x-2">
        Goyta
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-600 to-fuchsia-600">Prêmios</span>
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col w-3/5 lg:w-2/5 gap-2'>
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
          <Button type='submit'>Entrar</Button>
          <button
            className='text-blue-400 text-sm'
            type='button'
            onClick={() => navigate('/create-account')}
          >
            criar conta
          </button>
        </form>
      </Form>
    </div>
  );
}
