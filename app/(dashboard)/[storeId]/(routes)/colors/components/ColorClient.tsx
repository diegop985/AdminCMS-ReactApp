'use client';

import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import { ColorColumn, column } from './columns';
import { DataTable } from '@/components/ui/DataTable';
import ApiList from '@/components/ui/api-list';

interface ColorClientProps {
  data: ColorColumn[];
}

const ColorClient: React.FC<ColorClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  console.log(data);

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={`Colors (${data.length})`}
          description='Manage colors for your store'
        />
        <Button onClick={() => router.push(`/${params.storeId}/colors/new`)}>
          <Plus className='mr-2 h-4 w-4' />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable
        columns={column}
        data={data}
        searchKey='name'
      />
      <Heading
        title='API'
        description='API calls for Colors'
      />
      <Separator />
      <ApiList
        entityName='colors'
        entityIdName='colorId'
      />
    </>
  );
};

export default ColorClient;
