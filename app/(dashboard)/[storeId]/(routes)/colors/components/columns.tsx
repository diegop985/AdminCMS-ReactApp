'use client';

import { ColumnDef } from '@tanstack/react-table';
import CellAction from './CellAction';

export type ColorColumn = {
  id: string;
  name: string;
  value: string;
  createdAt: string;
};

export const column: ColumnDef<ColorColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'value',
    header: 'Value',
  },

  {
    header: 'Preview',
    id: 'displayColor',
    cell: ({ row }) => (
      <div
        className='rounded-full p-4  h-3 w-3'
        style={{ backgroundColor: row.original.value }}
      ></div>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
