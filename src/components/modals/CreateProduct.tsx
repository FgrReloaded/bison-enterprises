"use client"

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '@/lib/slices/modalSlice';
import ProductForm from '../forms/ProductForm';
import { CldUploadWidget, CloudinaryUploadWidgetResults } from 'next-cloudinary';
import { Button } from '../ui/button';
import { Upload } from 'lucide-react';


const CreateProductModal = () => {
    const dispatch = useDispatch();
    const { isOpen, type } = useSelector((state: any) => state.modal);

    const handleOnClose = () => {
        dispatch(closeModal());
    }

    const isModalOpen = isOpen && type === 'productForm';

    const handleUpload = (result: CloudinaryUploadWidgetResults) => {
        console.log(result);
    }
    return (
        <div>

            <Dialog open={isModalOpen} onOpenChange={handleOnClose}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create a New Product</DialogTitle>
                        <DialogDescription>
                            Fill in the form below to create a new product
                        </DialogDescription>
                    </DialogHeader>
                    <ProductForm handleModal={handleOnClose} />
                </DialogContent>

            </Dialog >
        </div>

    )
}

export default CreateProductModal