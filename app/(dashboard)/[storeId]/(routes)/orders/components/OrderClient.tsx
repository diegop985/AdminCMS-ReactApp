'use client';

import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import { OrderColumn, column } from './columns';
import { DataTable } from '@/components/ui/DataTable';

interface OrderClientProps {
  data: OrderColumn[];
}

const OrderClient: React.FC<OrderClientProps> = ({ data }) => {
  return (
    <>
      <Heading
        title={`Orders (${data.length})`}
        description='Manage orders for your store'
      />
      <Separator />
      <DataTable
        columns={column}
        data={data}
        searchKey='products'
      />
    </>
  );
};

export default OrderClient;
