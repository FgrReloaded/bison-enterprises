import ActionTooltip from '@/components/modals/ActionTooltip'
import { Product } from '@prisma/client'
import { Eye, Pencil, Trash } from 'lucide-react'
import { CldImage } from 'next-cloudinary'
import Image from 'next/image'
import React from 'react'

const ProductItem = ({product}: {product: Product}) => {
    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="relative w-20 h-20">
            <CldImage key={product.id} src={product.images[0]} fill style={{ objectFit: "cover", width: "100%", height: "100%" }} alt={product.name} />
            </td>
            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {product.name} <span className='text-gray-500 underline text-[0.65rem] cursor-pointer'>Preview</span>
            </td>
            <td className="px-6 py-4">
                <div className="flex items-center">
                    <button className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                        <span className="sr-only">Quantity button</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                        </svg>
                    </button>
                    <div>
                        <input type="number" className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required value={product.stock} />
                    </div>
                    <button className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                        <span className="sr-only">Quantity button</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                        </svg>
                    </button>
                </div>
            </td>
            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                ₹ {product.price}
            </td>
            <td className="px-6 py-4">
                <div className='flex gap-4'>
                    <ActionTooltip label="Hide" align='center' side='top' >
                        <span className='cursor-pointer hover:text-red-500 transition-all'><Eye size={24} /></span>
                    </ActionTooltip>
                    <ActionTooltip label="Edit" align='center' side='top' >
                        <span className='cursor-pointer hover:text-red-500 transition-all'><Pencil size={24} /></span>
                    </ActionTooltip>
                    <ActionTooltip label="Remove" align='center' side='top' >
                        <span className='cursor-pointer hover:text-red-500 transition-all'><Trash size={24} /></span>
                    </ActionTooltip>
                </div>
            </td>
        </tr>
    )
}

export default ProductItem