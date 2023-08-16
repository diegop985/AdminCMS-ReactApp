import prismadb from "@/lib/prismadb"

export const getStockCount = async (storeId: string) => {
  const products = await prismadb.product.findMany({
    where: {
      storeId,
      isArchived: false
    },

  })

  
  return products.length
}