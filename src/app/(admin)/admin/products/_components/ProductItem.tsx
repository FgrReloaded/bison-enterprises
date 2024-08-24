import ActionTooltip from '@/components/modals/ActionTooltip'
import UpdateStocks from '@/app/(admin)/admin/products/_components/UpdateStocks'
import { openModal } from '@/lib/slices/modalSlice'
import { Product } from '@prisma/client'
import { Pencil, Trash } from 'lucide-react'
import { CldImage } from 'next-cloudinary'
import React from 'react'
import { useDispatch } from 'react-redux'
import ProductVisibility from './ProductVisibility'
import Link from 'next/link'
import { Switch } from '@/components/ui/switch'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { featuredProduct } from '@/actions/admin/product'
import { toast } from 'sonner'

const ProductItem = ({ product }: { product: Product }) => {
    const dispatch = useDispatch();
    const queryClient = useQueryClient();



    const openDeleteModal = () => {
        dispatch(openModal({ type: 'deleteProduct', data: { inStock: product.stock, title: product.name, ...product } }))
    }

    const openUpdateModal = () => {
        dispatch(openModal({ type: 'updateProduct', data: { inStock: product.stock, title: product.name, ...product } }))
    }

    const { mutate } = useMutation({
        mutationFn: featuredProduct,
        onSuccess: (newProduct: Product) => {
            queryClient.setQueryData(['products'], (oldData: Product[]) => {
                return oldData.map((product: Product) => {
                    if (product.id === newProduct.id) {
                        return newProduct
                    }
                    return product
                })
            });

            if(newProduct.isFeatured){
                toast.success('Product featured successfully');
            }else{
                toast.success('Product unfeatured successfully');
            }
        },
        onError: (error) => {
            console.error(error);
            toast.error('Failed to featured product');
        }
    });


    const handleCheckedChanged = () => {
        mutate({ id: product.id })
    }


    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="relative w-20 h-20">
                <CldImage key={product.id} src={product.images[0]} fill style={{ objectFit: "cover", width: "100%", height: "100%" }} alt={product.name} />
            </td>
            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {product.name} <Link href={`/products/${product?.id}`} ><span className='text-gray-500 underline text-[0.65rem] cursor-pointer'>Preview</span></Link>
            </td>
            <td className="px-6 py-4">
                <UpdateStocks id={product.id} stock={product.stock} />
            </td>
            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                ₹ {product.price}
            </td>
            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                <Switch
                    checked={product?.isFeatured ?? false}
                    onCheckedChange={handleCheckedChanged}
                />
            </td>
            <td className="px-6 py-4">
                <div className='flex gap-4'>
                    <ProductVisibility id={product.id} isHide={product.isHide} />
                    <ActionTooltip label="Edit" align='center' side='top' >
                        <span onClick={openUpdateModal} className='cursor-pointer hover:text-red-500 transition-all'><Pencil size={24} /></span>
                    </ActionTooltip>
                    <ActionTooltip label="Remove" align='center' side='top' >
                        <span onClick={openDeleteModal} className='cursor-pointer hover:text-red-500 transition-all'><Trash size={24} /></span>
                    </ActionTooltip>
                </div>
            </td>
        </tr>
    )
}

export default ProductItem