"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '@/lib/slices/modalSlice';
import QuickView from '../products/QuickView';


const ProductReview = () => {
    const dispatch = useDispatch();
    const { isOpen, type } = useSelector((state: any) => state.modal);
    const handleOnClose = () => {
        dispatch(closeModal());
    }
    const isModalOpen = isOpen && type === 'quickView';
    return (
        <div>

            <Dialog open={isModalOpen} onOpenChange={handleOnClose}>
                <DialogContent className='md:max-w-[60vw]'>
                    <DialogHeader>
                        <DialogTitle>Review Your Product</DialogTitle>
                        <DialogDescription>
                            To change click edit button
                        </DialogDescription>
                    </DialogHeader>
                    <QuickView />
                </DialogContent>

            </Dialog >
        </div>

    )
}

export default ProductReview