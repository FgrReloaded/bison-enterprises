"use client"

import { getLatestOrders } from "@/actions/admin/orders";
import { useQuery } from "@tanstack/react-query";

const LatestOrders = () => {
  const { data: latestOrders } = useQuery({
    queryKey: ['latest-orders'],
    queryFn: () => getLatestOrders(),
    initialData: [],
  });
  return (
    <>
      {
        latestOrders && latestOrders.map((order, idx) => (
          <tr key={idx}>
            <td className="py-3 px-5 border-b border-blue-gray-50">
              <div className="flex items-center gap-4">
                <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-bold">{order?.id}</p>
              </div>
            </td>

            <td className="py-3 px-5 border-b border-blue-gray-50">
              <p className="block antialiased font-sans text-xs font-medium text-blue-gray-600">₹ {order?.total}</p>
            </td>
            <td className="py-3 px-5 border-b border-blue-gray-50">
              <div className="w-10/12">
                <p className="antialiased font-sans mb-1 block text-xs font-medium text-blue-gray-600">{order?.customer?.name}</p>
               
              </div>
            </td>
          </tr>
        ))
      }
    </>
  )
}

export default LatestOrders