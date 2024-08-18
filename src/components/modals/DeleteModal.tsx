"use client"

import React, { useState } from 'react';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

import { Button } from '../ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '@/lib/slices/modalSlice';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProduct } from '@/actions/product';
import { Product } from '@prisma/client';
import { toast } from 'sonner';


const DeleteProductModal = () => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const { isOpen, type, data } = useSelector((state: any) => state.modal);


    const isModalOpen = isOpen && type === 'deleteProduct';

    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: deleteProduct,
        onSuccess: (succes: boolean) => {
            if (!succes) return;
            queryClient.setQueryData(['products'], (oldData: any) => {
                return oldData.filter((p: Product) => p.id !== data?.id);
            });

            queryClient.invalidateQueries({
                queryKey: ['products']
            });
            setIsLoading(false);
            dispatch(closeModal());
            toast.success('Product deleted successfully');
        },
        onError: (error) => {
            console.error(error);
            toast.error('Failed to create product');
        }
    });

    const handleProductDeletion = () => {
        setIsLoading(true);
        mutate(data?.id);
    }


    return (
        <Dialog open={isModalOpen} onOpenChange={() => { dispatch(closeModal()) }}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Product</DialogTitle>
                    <DialogDescription className='text-center text-zinc-500'>
                        <p>Are you sure you want to delete <span className='font-semibold dark:text-white text-black'>
                            {data?.title}
                        </span> ?
                        </p>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className='mt-6'>
                    <div className="flex items-center justify-between w-full">
                        <Button
                            className='bg-gray-500 hover:bg-gray-600 dark:hover:bg-gray-400'
                            onClick={() => { dispatch(closeModal()) }}
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button
                            className='bg-red-500 hover:bg-red-600 dark:hover:bg-red-400'
                            disabled={isLoading} onClick={handleProductDeletion}
                        >
                            Delete Product
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    )
}

export default DeleteProductModal