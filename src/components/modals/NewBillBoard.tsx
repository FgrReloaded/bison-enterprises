"use client"

import React, { useState } from 'react';

import { Button } from '../ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '@/lib/slices/modalSlice';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import BillBoardForm from '../forms/BillBoardForm';


const NewBillBoard = () => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const { isOpen, type } = useSelector((state: any) => state.modal);


    const isModalOpen = isOpen && type === 'newBillboard';

    const queryClient = useQueryClient();

    // const { mutate } = useMutation({
    //     mutationFn: deleteProduct,
    //     onSuccess: (succes: boolean) => {
    //         if (!succes) return;
    //         queryClient.setQueryData(['products'], (oldData: any) => {
    //             return oldData.filter((p: Product) => p.id !== data?.id);
    //         });

    //         queryClient.invalidateQueries({
    //             queryKey: ['products']
    //         });
    //         setIsLoading(false);
    //         dispatch(closeModal());
    //         toast.success('Product deleted successfully');
    //     },
    //     onError: (error) => {
    //         console.error(error);
    //         toast.error('Failed to delete product product');
    //     }
    // });

    const handleProductDeletion = () => {
        setIsLoading(true);
    }


    return (
        <Dialog open={isModalOpen} onOpenChange={() => { dispatch(closeModal()) }}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Billboard</DialogTitle>
                    <DialogDescription className='text-center text-zinc-500'>
                        Create a new billboard
                    </DialogDescription>
                </DialogHeader>
                <BillBoardForm  />
            </DialogContent>
        </Dialog >
    )
}

export default NewBillBoard