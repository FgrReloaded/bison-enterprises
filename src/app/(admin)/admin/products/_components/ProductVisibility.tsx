"use client"
import { productVisibility } from '@/actions/admin/product'
import ActionTooltip from '@/components/modals/ActionTooltip'
import { Product } from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Eye, EyeOffIcon } from 'lucide-react'
import { toast } from 'sonner'

interface HideProductProps {
    id: string
    isHide: boolean | null
}

const ProductVisibility = ({ id, isHide }: HideProductProps) => {
    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: productVisibility,
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

    const handleProductHide = () => {
        mutate({ id, isHide: !isHide })
    }
    return (
        <ActionTooltip label={isHide ? "Show" : "Hide"} align='center' side='top' >
            <span onClick={handleProductHide} className='cursor-pointer hover:text-red-500 transition-all'>
                {
                    isHide === null && <Eye size={24} />
                }
                {isHide !== null && (isHide ? <EyeOffIcon size={24} /> : <Eye size={24} />)}
            </span>
        </ActionTooltip>
    )
}

export default ProductVisibility