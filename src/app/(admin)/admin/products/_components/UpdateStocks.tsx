"use client"
import { Input } from '../../../../../components/ui/input'
import ActionTooltip from '../../../../../components/modals/ActionTooltip'
import { CircleCheck } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateStock } from '@/actions/admin/product'
import { Product } from '@prisma/client'

interface StockProps {
    id: string
    stock: number
}

const UpdateStocks = ({ id, stock }: StockProps) => {
    const [currentStock, setCurrentStock] = useState<number>(stock);
    const queryClient = useQueryClient();

    const updateStocks = (value: number) => {
        setCurrentStock(currentStock + value)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentStock(parseInt(e.target.value))
    }


    const { mutate } = useMutation({
        mutationFn: updateStock,
        onSuccess: (newProduct: Product) => {
            queryClient.setQueryData(['products'], (oldData: Product[]) => {
                return oldData.map((product: Product) => {
                    if (product.id === newProduct.id) {
                        return newProduct
                    }
                    return product
                })
            });

            queryClient.invalidateQueries({
                queryKey: ['products']
            });
            toast.success('Product updated successfully');
        },
        onError: (error) => {
            console.error(error);
            toast.error('Failed to update product');
        }
    });



    const handleStockUpdation = () => {
        if (stock === currentStock) return;
        mutate({ id, stock: currentStock })
    }

    return (
        <div className="flex items-center">
            <button className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                <span className="sr-only">Quantity button</span>
                <svg onClick={() => {
                    updateStocks(-1)
                }} className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                </svg>
            </button>
            <div>
                <Input onChange={handleChange} type="number" className="bg-gray-50 w-28 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required value={currentStock} />
            </div>
            <button className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                <span className="sr-only">Quantity button</span>
                <svg onClick={() => {
                    updateStocks(1)
                }} className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                </svg>
            </button>
            {
                stock !== currentStock &&
                <ActionTooltip label="Update" align='center' side='top' >
                    <span onClick={handleStockUpdation} className='ml-4 cursor-pointer'>
                        <CircleCheck size={16} className='text-red-600' />
                    </span>
                </ActionTooltip>
            }
        </div>
    )
}

export default UpdateStocks