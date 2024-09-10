"use client"

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
    Form, FormControl, FormLabel, FormField, FormItem, FormMessage
} from "@/components/ui/form"

import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Upload, XCircle } from 'lucide-react';
import { DialogFooter } from '../ui/dialog';
import { CldImage, CldUploadWidget } from 'next-cloudinary';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '@/lib/slices/modalSlice';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBillboard } from '@/actions/admin/billboards';
import { toast } from 'sonner';


const billboardFormSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    tagline: z.string().min(1, 'Tagline is required'),
    link: z.string().min(5, 'Link is required'),
    image: z.string().min(1, 'Image is required')
})

const BillBoardForm = () => {
    const dispatch = useDispatch();
    const { data, type } = useSelector((state: any) => state.modal);
    const [uploadedImage, setUploadedImage] = useState<string>('');
    const queryClient = useQueryClient();
    const [isLoading, setisLoading] = useState(false)

    const form = useForm({
        mode: 'onChange',
        resolver: zodResolver(billboardFormSchema),
        defaultValues: {
            title: '',
            tagline: '',
            link: '',
            image: '',
        }
    })

    const { mutate } = useMutation({
        mutationFn: createBillboard,
        onSuccess: () => {
            queryClient.setQueryData(['billboards'], (oldData: any) => { });
            queryClient.invalidateQueries({
                queryKey: ['billboards']
            });
            setisLoading(false)
            form.reset();
            dispatch(closeModal());
            toast.success('Billboard created successfully');
        }
    })

    const onSubmit = async (values: z.infer<typeof billboardFormSchema>) => {
        setisLoading(true)
        const { title, tagline, link, image } = values;
        mutate({ title, tagline, link, image });
    }

    const handleUpload = (result: any) => {
        if (!result) return;
        if (result?.event !== 'success') return;
        const publicId = result?.info?.public_id;
        form.setValue('image', publicId);
        setUploadedImage(publicId)
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="space-y-4">
                    <div className='flex gap-8 flex-col '>
                        <FormField
                            control={form.control}
                            name='title'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Billboard Title
                                    </FormLabel>
                                    <FormControl>
                                        <Input className='py-6' placeholder='Enter title for Billboard' disabled={isLoading} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField control={form.control} name='tagline' render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Billboard Tagline
                                </FormLabel>
                                <FormControl>
                                    <Input type='text' className='py-6 ' placeholder='Enter tagline for Billboard' disabled={isLoading} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name='link' render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Product Link
                                </FormLabel>
                                <FormControl>
                                    <Input type='text' className='py-6 ' placeholder='Enter link for Product' disabled={isLoading} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>

                </div>

                <div className='flex gap-4 items-center py-4'>
                    {
                        uploadedImage &&
                        <div className='w-12 h-12 rounded-full border-1 border-gray-500 relative'>
                            <CldImage key={uploadedImage} src={uploadedImage} width='50' height='50' style={{ borderRadius: "50%", objectFit: "contain", width: "100%", height: "100%" }} alt='img' />
                            <span>
                                <XCircle size={20} className='absolute -top-1 -right-1 cursor-pointer text-white rounded-full bg-red-500 ' />
                            </span>
                        </div>
                    }
                </div>
                <DialogFooter className='py-4 flex-col'>
                    <div className="flex items-center gap-2 justify-end w-full">
                        <CldUploadWidget options={{ maxFiles: 1 }} onSuccess={handleUpload} uploadPreset='online_store' signatureEndpoint="/api/cloudinary">
                            {({ open }) => {
                                return (
                                    <Button disabled={!!uploadedImage ?? false} type='button' onClick={() => { open() }} >
                                        {uploadedImage?.length ? "Max 1 Images" : <>Add Images <Upload className='ml-4' size={20} /></>}
                                    </Button>
                                );
                            }}
                        </CldUploadWidget>
                        <Button
                            className='bg-black hover:bg-gray-800 dark:hover:bg-gray-900'
                            disabled={isLoading}
                        >
                            Add Billboard
                        </Button>
                        <Button
                        className='bg-gray-500 hover:bg-gray-600 dark:hover:bg-gray-400'
                        onClick={() => { dispatch(closeModal()) }}
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                    </div>
                </DialogFooter>
            </form>
        </Form >

    )
}

export default BillBoardForm