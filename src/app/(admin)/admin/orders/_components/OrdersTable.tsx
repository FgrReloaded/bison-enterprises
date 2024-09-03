"use client"

import React from 'react'
import OrderItem from './OrderItem'
import { SquareDashedKanban } from 'lucide-react'
import { fetchAllOrders } from '@/actions/admin/orders'
import { useQuery } from '@tanstack/react-query'

const OrdersTable = () => {
    const { data: orders, isLoading } = useQuery({
        queryKey: ['all-orders'],
        queryFn: fetchAllOrders,
        initialData: [],
    })

    if (isLoading) {
        return <div className='w-full flex items-center justify-center flex-col gap-6 mt-6 mx-auto'>
            <SquareDashedKanban size={48} className='text-gray-500 dark:text-gray-400' />
            <span className='text-gray-500 dark:text-gray-400 uppercase text-4xl font-extrabold'>Loading...</span>
        </div>
    }

    if (orders?.length === 0) {
        return (
            <div className='w-full flex items-center justify-center flex-col gap-6 mt-6 mx-auto'>
                <SquareDashedKanban size={48} className='text-gray-500 dark:text-gray-400' />
                <span className='text-gray-500 dark:text-gray-400 uppercase text-4xl font-extrabold'>No Orders found</span>
            </div>
        )
    }
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                            Order Id
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Products
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Amount
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders?.map(order => <OrderItem order={order} />)
                    }
                </tbody>
            </table>
        </div>
    )
}

export default OrdersTable