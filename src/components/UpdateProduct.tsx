import { Check } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { updateProduct } from '@/actions/product'
import { closeModal } from '@/lib/slices/modalSlice'
import { useDispatch } from 'react-redux'

interface UpdateProductProps {
    isValid: boolean
    form: any
    productId: string
}

const UpdateProduct = ({ isValid, form, productId }: UpdateProductProps) => {
    const dispatch = useDispatch();
    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: updateProduct,
        onSuccess: (newProduct: any) => {
            queryClient.setQueryData(['products'], (oldData: any) => {
                return oldData.map((product: any) => {
                    if (product.id === newProduct.id) {
                        return newProduct;
                    }
                    return product;
                });
            });

            queryClient.invalidateQueries({
                queryKey: ['products']
            });
            dispatch(closeModal());
            toast.success('Product updated successfully');
        },
        onError: (error) => {
            console.error(error);
            toast.error('Failed to update product');
        }
    });

    const handleProductionUpdation = () => {
        mutate({ id: productId, name: form.getValues('title'), stock: form.getValues('inStock'), ...form.getValues() });
    }

    return (
        <Button onClick={handleProductionUpdation} type='button'
            disabled={isValid}
            className='ml-auto'>
            Update <Check className='ml-4' size={20} />
        </Button>
    )
}

export default UpdateProduct