"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '@/lib/slices/modalSlice';
import QuickView from '../products/QuickView';
import NewAdminForm from '../forms/NewAdminForm';


const NewAdmin = () => {
    const dispatch = useDispatch();
    const { isOpen, type } = useSelector((state: any) => state.modal);
    const handleOnClose = () => {
        dispatch(closeModal());
    }
    const isModalOpen = isOpen && type === 'newAdmin';
    return (
        <div>

            <Dialog open={isModalOpen} onOpenChange={handleOnClose}>
                <DialogContent className='md:max-w-[60vw]'>
                    <DialogHeader>
                        <DialogTitle>Add New Admin User</DialogTitle>
                        <DialogDescription>
                            Fill in the form below to add a new admin user
                        </DialogDescription>
                    </DialogHeader>
                    <NewAdminForm />
                </DialogContent>

            </Dialog >
        </div>

    )
}

export default NewAdmin