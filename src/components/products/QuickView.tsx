"use client"
import React from 'react'
import { Button } from '../ui/button';
import { Pencil } from 'lucide-react';
import { CldImage } from 'next-cloudinary';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, openModal } from '@/lib/slices/modalSlice';
import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProduct } from '@/actions/admin/product';

const QuickView = () => {
    const dispatch = useDispatch();
    const { data } = useSelector((state: any) => state.modal);
    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: createProduct,
        onSuccess: (newProduct: any) => {
            queryClient.setQueryData(['products'], (oldData: any) => {
                return oldData ? [...oldData, newProduct] : [newProduct];
            });

            queryClient.invalidateQueries({
                queryKey: ['products']
            });
            dispatch(closeModal());
            toast.success('Product created successfully');
        },
        onError: (error) => {
            console.error(error);
            toast.error('Failed to create product');
        }
    });

    const handleProductCreation = () => {
        mutate({ name: data.title, stock: data.inStock, ...data });
    }

    if (!data) return null;

    const { title, description, price, inStock, images } = data;


    return (
        <div className='flex flex-col gap-4'>
            <div className='flex gap-4 items-center justify-center'>
                <div className='flex flex-col items-center gap-4'>
                    <div className='w-[30vw] h-[30vw] relative'>
                        <CldImage src={images[0]} fill style={{ objectFit: "cover", width: "100%", height: "100%" }} alt={title} />
                    </div>
                    <div className='grid grid-cols-5 gap-4'>
                        {images.length > 1 &&
                            images.slice(1, 6).map((image: string, index: number) => (
                                <div key={index} className='border-1 border-gray-500 w-20 h-20 relative overflow-hidden'>
                                    <CldImage key={image} src={image} fill style={{ objectFit: "cover", width: "100%", height: "100%" }} alt={title} />
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className='flex flex-col gap-4 mb-auto'>
                    <h2 className='pb-1 font-semibold text-3xl'>{title}</h2>
                    <p className='py-2 text-sm '>{description}</p>
                    <span>
                        Stock: {inStock ?? "Out of Stock"}
                    </span>
                    <span>
                        Price: ₹ {price}
                    </span>
                    <div className='flex gap-4 mt-5 mr-auto'>
                        <Button onClick={() => {
                            dispatch(openModal({
                                type: "productForm",
                                data
                            }))
                        }} type='submit' className='ml-auto'>
                            Edit <Pencil size={16} className='ml-2' />
                        </Button>
                        <Button type='button' onClick={handleProductCreation} className='ml-auto'>
                            Publish
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuickView