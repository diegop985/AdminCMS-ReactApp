import { Billboard } from '@prisma/client';
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import prismadb from '@/lib/prismadb';

export async function PATCH(
  req: Request,
  { params }: { params: { sizeId: string,  storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name, value } = body;

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 });
    }

    if (!name) {
      return new NextResponse('NAme is required', { status: 400 });
    }

    
    if (!value) {
      return new NextResponse('Value is required', { status: 400 });
    }

    if (!params.sizeId) {
      return new NextResponse('Size ID is required', { status: 400 });
    }

    const storeByUserId = await prismadb.store.findMany({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", {status: 403})
    }

    const size = await prismadb.size.updateMany({
      where: {
        id: params.sizeId,
        
      },
      data: {
        name,
        value,
      }
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log('[SIZE PATCH]: ', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { sizeId: string, storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 });
    }

    if (!params.sizeId) {
      return new NextResponse('Size ID is required', { status: 401 });
    }

    if (!params.storeId) {
      return new NextResponse('Store ID is required', { status: 400 });
    }

    const storeByUserId = await prismadb.store.findMany({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const size = await prismadb.size.deleteMany({
      where: {
        id: params.sizeId,
      }
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log('[SIZE DELETE]: ', error);
    return new NextResponse('Internal Error', { status: 500 });
  }


}

export async function GET(
  _req: Request,
  { params }: { params: { sizeId: string } }
) {
  try {

    const size = await prismadb.size.findUnique({
      where: {
        id: params.sizeId,
      }
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log('[SIZE GET]: ', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
