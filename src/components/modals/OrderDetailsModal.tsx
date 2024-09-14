"use client"

import React, { useState } from 'react';

import { Button } from '../ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '@/lib/slices/modalSlice';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import BillBoardForm from '../forms/BillBoardForm';
import BannerForm from '../forms/BannerForm';
import OrderDetails from '../admin/orders';
import { ScrollArea } from '../ui/scroll-area';
import { RootState } from '@/lib/store';


const OrderDetailsModal = () => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const { isOpen, type, order } = useSelector((state: RootState) => state.modal);
    const isModalOpen = isOpen && type === 'orderDetails';
    const queryClient = useQueryClient();

    return (
        <Dialog open={isModalOpen} onOpenChange={() => { dispatch(closeModal()) }}>
            <DialogContent className='md:max-w-[80%] w-full'>
                <DialogTitle>
                    Order Details
                </DialogTitle>
                <ScrollArea>
                    <OrderDetails order={order}  />
                </ScrollArea>
            </DialogContent>
        </Dialog >
    )
}

export default OrderDetailsModal