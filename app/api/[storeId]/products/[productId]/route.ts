import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import prismadb from '@/lib/prismadb';


export async function PATCH(
  req: Request,
  { params }: { params: { productId: string,  storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

      const {
      name,
      price,
      images,
      categoryId,
      sizeId,
      colorId,
      isArchived,
      isFeatured,
    } = body;

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 });
    }

    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }

    if (!price) {
      return new NextResponse('Price is required', { status: 400 });
    }

    if (!images || !images.length) {
      return new NextResponse('Images are required', { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse('Category ID is required', { status: 400 });
    }

    if (!sizeId) {
      return new NextResponse('Size ID is required', { status: 400 });
    }

    if (!colorId) {
      return new NextResponse('Color ID is required', { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse('Store ID is required', { status: 400 });
    }

    if (!params.productId) {
      return new NextResponse('Product ID is required', { status: 400 });
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

    await prismadb.product.update({
      where: {
        id: params.productId,
        
      },
      data: {
        name,
        price,
        categoryId,
        sizeId,
        colorId,
        isArchived,
        isFeatured,
        images: {
          deleteMany: {}
        },
      },
    });

    const product = await prismadb.product.update({
      where: {
        id: params.productId
      },
      data: {
        images: {
          createMany: {
            data: [
              ...images.map((image: { url: string }) => image)
            ]
          }
        }
      }
    })

    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCT PATCH]: ', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { productId: string, storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 });
    }

    if (!params.productId) {
      return new NextResponse('Product ID is required', { status: 401 });
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

    const product = await prismadb.product.deleteMany({
      where: {
        id: params.productId,
      }
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCT DELETE]: ', error);
    return new NextResponse('Internal Error', { status: 500 });
  }


}

export async function GET(
  _req: Request,
  { params }: { params: { productId: string } }
) {
  try {

    if (!params.productId) {
      return new NextResponse("Product ID is required.")
    }

    const product = await prismadb.product.findUnique({
      where: {
        id: params.productId,
      },
      include: {
        images: true,
        color: true,
        category: true,
        size: true,
      }
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCT GET]: ', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
