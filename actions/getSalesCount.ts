import prismadb from "@/lib/prismadb"

export const getSalesCount = async (storeId: string) => {
  const orders = await prismadb.order.findMany({
    where: {
      storeId
    },
    include: {
      orderItems: true
    }
  })

  
  return orders.length
}