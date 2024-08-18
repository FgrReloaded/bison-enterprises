"use client"

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '@/lib/slices/modalSlice';
import VariantForm from '../forms/VariantForm';

const CreateVariantModal = () => {
    const dispatch = useDispatch();
    const { isOpen, type } = useSelector((state: any) => state.modal);

    const handleOnClose = () => {
        dispatch(closeModal());
    }

    const isModalOpen = isOpen && type === 'variantModal'

    return (
        <div>

            <Dialog open={isModalOpen} onOpenChange={handleOnClose}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create a New Variant</DialogTitle>
                        <DialogDescription>
                            Fill in the form below to create a new variant
                        </DialogDescription>
                    </DialogHeader>
                    <VariantForm />
                </DialogContent>

            </Dialog >
        </div>

    )
}

export default CreateVariantModal