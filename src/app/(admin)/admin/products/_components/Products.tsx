"use client"
import TableItem from './ProductItem'
import { ProductSkeleton } from './ProductSkeleton';
import { Product } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/actions/product';
import { SquareDashedKanban } from 'lucide-react';

const ProductsTable = () => {
    const { data: products, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: getProducts,
    })

    if (isLoading) {
        return <ProductSkeleton />
    }

    if (products?.length === 0) {
        return (
            <div className='w-full flex items-center justify-center flex-col gap-6 mt-6'>
                <SquareDashedKanban size={48} className='text-gray-500 dark:text-gray-400' />
                <span className='text-gray-500 dark:text-gray-400 uppercase text-4xl font-extrabold'>No products found</span>
            </div>
        )
    }

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-16 py-3">
                            <span className="sr-only">Image</span>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Product
                        </th>
                        <th scope="col" className="px-6 py-3">
                            In Stock
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products?.map((product: Product, index: number) => (
                            <TableItem key={index} product={product} />
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ProductsTable