"use client"

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '@/lib/slices/modalSlice';
import NewCategoryForm from '../forms/NewCategoryForm';

const CreateCategoryModal = () => {
    const dispatch = useDispatch();
    const { isOpen, type } = useSelector((state: any) => state.modal);

    const handleOnClose = () => {
        dispatch(closeModal());
    }

    const isModalOpen = isOpen && (type === 'categoryForm');

    return (
        <div>

            <Dialog open={isModalOpen} onOpenChange={handleOnClose}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create a New Category</DialogTitle>
                        <DialogDescription>
                            Fill in the form below to create a new category
                        </DialogDescription>
                    </DialogHeader>
                    <NewCategoryForm />
                </DialogContent>

            </Dialog >
        </div>

    )
}

export default CreateCategoryModal