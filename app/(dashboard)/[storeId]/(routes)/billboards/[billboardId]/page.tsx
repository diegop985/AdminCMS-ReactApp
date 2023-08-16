import prismadb from '@/lib/prismadb';
import { BillboardForm } from './components/BillboardForm';
import { useRouter } from 'next/router';

export default async function BillboardsPage({
  params,
}: {
  params: { billboardId: string };
}) {
  const billboard = await prismadb.billboard.findUnique({
    where: {
      id: params.billboardId,
    },
  });
  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <BillboardForm initialData={billboard} />
      </div>
    </div>
  );
}
