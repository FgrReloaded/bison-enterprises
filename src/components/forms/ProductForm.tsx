"use client"

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
    Form, FormControl, FormLabel, FormField, FormItem, FormMessage
} from "@/components/ui/form"

import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Check, Upload, XCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { DialogFooter } from '../ui/dialog';
import { CldImage, CldUploadWidget, CloudinaryUploadWidgetInfo } from 'next-cloudinary';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '@/lib/slices/modalSlice';
import UpdateProduct from '../UpdateProduct';


const formSchema = z.object({
    title: z.string().min(1, 'Product name is required'),
    description: z.string().min(50, 'Product description is required'),
    price: z.number().min(1, 'Price is required'),
    inStock: z.number().min(1, 'Minimum stock is 1'),
    images: z.array(z.string()).min(4, 'Add at least 4 images').max(6),
})

const ProductForm = () => {
    const dispatch = useDispatch();
    const { data, type } = useSelector((state: any) => state.modal);
    const [uploadedImages, setUploadedImages] = useState<Array<string>>([]);

    const form = useForm({
        mode: 'onChange',
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            description: '',
            price: 0,
            inStock: 0,
            images: [] as Array<string>
        }
    })
    const isLoading = form.formState.isSubmitting;

    const handleUpload = (result: any) => {
        if (!result) return;
        if (result?.event !== 'success') return;
        const images = form.getValues('images') as Array<string>;
        if (images.length >= 6) return;
        images.push(result?.info?.public_id);
        form.setValue('images', images);
    }

    const handleReview = () => {
        dispatch(openModal({
            type: "quickView",
            data: {
                title: form.getValues('title'),
                description: form.getValues('description'),
                price: form.getValues('price'),
                inStock: form.getValues('inStock'),
                images: form.getValues('images')
            }
        }));
    }

    const showUploadedImages = () => {
        const images = form.getValues('images') as Array<string>;
        if (images.length === 0) return;
        setUploadedImages(images);
    }

    useEffect(() => {
        if (!data) return
        setUploadedImages(data.images);
        form.setValue('title', data?.title);
        form.setValue('description', data?.description);
        form.setValue('price', data?.price);
        form.setValue('inStock', data?.inStock);
        form.setValue('images', data?.images);
    }, [data]);

    return (
        <Form {...form}>
            <form>
                <div className="space-y-8">
                    <div className='space-y-8'>
                        <FormField
                            control={form.control}
                            name='title'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Product Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input className='py-6' placeholder='Enter Product Name' disabled={isLoading} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className='flex gap-8 items-center'>
                        <FormField control={form.control} name='price' render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Set Price (INR)
                                </FormLabel>
                                <FormControl>
                                    <Input type='number' className='py-6' placeholder='Set Price' disabled={isLoading} {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name='inStock' render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Items in stock
                                </FormLabel>
                                <FormControl>
                                    <Input type='number' className='py-6' placeholder='Set available quantity' disabled={isLoading}  {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>

                    <FormField control={form.control} name='description' render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Product Description
                            </FormLabel>
                            <FormControl>
                                <Textarea rows={3} className='py-2 resize-none' placeholder='Add Product Description' disabled={isLoading} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                </div>
                <div className='flex gap-4 items-center py-4'>
                    {
                        uploadedImages?.map((image) => {
                            return (
                                <div key={image} className='w-12 h-12 rounded-full border-1 border-gray-500 relative'>
                                    <CldImage key={image} src={image} width='50' height='50' style={{ borderRadius: "50%", objectFit: "contain", width: "100%", height: "100%" }} alt='img' />
                                    <span>
                                        <XCircle size={20} className='absolute -top-1 -right-1 cursor-pointer text-white rounded-full bg-red-500 ' />
                                    </span>
                                </div>
                            )
                        })
                    }
                </div>
                <DialogFooter className='py-4'>
                    <CldUploadWidget onClose={showUploadedImages} onSuccess={handleUpload} uploadPreset='online_store' signatureEndpoint="/api/cloudinary">
                        {({ open }) => {
                            return (
                                <Button disabled={uploadedImages?.length >= 6} type='button' onClick={() => { open() }} className='mr-auto'>
                                    {uploadedImages?.length >= 6 ? "Max 6 Images" : <>Add Images <Upload className='ml-4' size={20} /></>}
                                </Button>
                            );
                        }}
                    </CldUploadWidget>
                    {
                        type === 'updateProduct' ?
                            <UpdateProduct form={form} productId={data?.id} isValid={!form.formState.isValid} /> :
                            <Button onClick={handleReview} type='button'
                                // disabled={!form.formState.isValid}
                                className='ml-auto'>
                                Review <Check className='ml-4' size={20} />
                            </Button>
                    }
                </DialogFooter>
            </form>
        </Form >

    )
}

export default ProductForm