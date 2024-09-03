"use client"
import { deleteOrder } from '@/actions/admin/orders'
import ActionTooltip from '@/components/modals/ActionTooltip'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Order, OrderStatus } from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Pencil, Trash } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { toast } from 'sonner'

const ORDER_STATUS: OrderStatus[] = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED']

const OrderItem = ({ order }: { order: Order }) => {
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: deleteOrder,
        onSuccess: () => {
            queryClient.setQueryData(['all-orders'], (oldData: any) => {
                return oldData.filter((o: Order) => o.id !== order.id)
            });

            queryClient.invalidateQueries({
                queryKey: ['all-orders']
            });
            toast.success('Order deleted successfully');
        },
        onError: (error) => {
            console.error(error);
            toast.error('Failed to delete product product');
        }
    });
    const handleDeleteOrder = async (id: string) => {
        mutate(id)
    }
    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="relative w-20 h-20">
                {order?.id}
            </td>
            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {
                    order?.items.map((item: any) => (
                        <Link key={item?.id} href={`/products/${item?.product.id}`}>
                            <span key={item?.id} className="flex gap-2 items-center">
                                <span>{(item?.product.name)?.substring(0, 20) + "..."}</span><span className='text-gray-400 text-xs'>x {item?.quantity}</span>
                            </span>
                        </Link>
                    ))
                }
            </td>
            <td className="px-6 py-4">
                <Select defaultValue={order?.status}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {
                                ORDER_STATUS.map(status => (
                                    <SelectItem key={status} value={status}>{status}</SelectItem>
                                ))
                            }
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </td>
            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                ₹ {order?.total}
            </td>
            <td className="px-6 py-4">
                <div className='flex gap-4'>
                    <ActionTooltip label="Edit" align='center' side='top' >
                        <span className='cursor-pointer hover:text-red-500 transition-all'><Pencil size={24} /></span>
                    </ActionTooltip>
                    <ActionTooltip label="Remove" align='center' side='top' >
                        <span onClick={() => { handleDeleteOrder(order?.id) }} className='cursor-pointer hover:text-red-500 transition-all'><Trash size={24} /></span>
                    </ActionTooltip>
                </div>
            </td>
        </tr>
    )
}

export default OrderItem