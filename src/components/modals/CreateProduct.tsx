"use client"

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '@/lib/slices/modalSlice';
import ProductForm from '../forms/ProductForm';

const CreateProductModal = () => {
    const dispatch = useDispatch();
    const { isOpen, type } = useSelector((state: any) => state.modal);

    const handleOnClose = () => {
        dispatch(closeModal());
    }

    const isModalOpen = isOpen && (type === 'productForm' || type === 'updateProduct');

    return (
        <div>

            <Dialog open={isModalOpen} onOpenChange={handleOnClose}>
                <DialogContent className='max-w-[80%]'>
                    <DialogHeader>
                        <DialogTitle>Create a New Product</DialogTitle>
                        <DialogDescription>
                            Fill in the form below to create a new product
                        </DialogDescription>
                    </DialogHeader>
                    <ProductForm />
                </DialogContent>

            </Dialog >
        </div>

    )
}

export default CreateProductModal