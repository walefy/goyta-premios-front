import { CreateAdminAccount } from '@/components/CreateAdminAccount';
import { CreateUserAccount } from '@/components/CreateUserAccount';
import { TabsTrigger, Tabs, TabsList, TabsContent } from '@/components/ui/tabs';


export function CreateAccount() {
  return (
    <div className="flex flex-col gap-y-20 justify-center items-center w-full h-screen">
      <h1 className="text-4xl font-extrabold leading-tighter flex items-center space-x-2">
        Goyta
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-600 to-fuchsia-600">Prêmios</span>
      </h1>
      <Tabs defaultValue="user-account" className='flex flex-col justify-center items-center w-full'>
        <TabsList className="mb-5">
          <TabsTrigger value="user-account">Usuário</TabsTrigger>
          <TabsTrigger value="admin-account">Administrador</TabsTrigger>
        </TabsList>
        <TabsContent value="user-account" className='flex flex-col w-full justify-center items-center m-0'>
          <CreateUserAccount />
        </TabsContent>
        <TabsContent value="admin-account" className='flex flex-col w-full justify-center items-center m-0'>
          <CreateAdminAccount />
        </TabsContent>
      </Tabs>
    </div>
  );
}
