import prismadb from "@/lib/prismadb"

export const getTotalRevenue = async (storeId: string) => {
  const orders = await prismadb.order.findMany({
    where: {
      storeId
    },
    include: {
      orderItems: {
        include: {
          product: true
        }
      }
    }
  })

  const totalRevenue = orders.reduce((accum, current) => {
    const orderTotal = current.orderItems.reduce((orderSum, item) => {
      return orderSum + item.product.price.toNumber()
    }, 0)

    return accum + orderTotal
  }, 0)
  
  return totalRevenue
}