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
import { ArrowRight, Check, Upload } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { DialogFooter } from '../ui/dialog';
import { CldUploadWidget } from 'next-cloudinary';


const formSchema = z.object({
    title: z.string().min(1, 'Product name is required'),
    description: z.string().min(50, 'Product description is required'),
    price: z.number().min(1, 'Price is required'),
    inStock: z.number().min(1, 'Minimum stock is 1'),
    images: z.array(z.string()).min(4, 'Add at least 4 images'),
})

interface ProductFormProps {
    handleModal: () => void
}


const ProductForm = ({ handleModal }: ProductFormProps) => {
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            description: '',
            price: 0,
            inStock: 0,
            images: []
        }
    })
    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            form.reset();
            router.refresh();
            handleModal();
        } catch (error) {
            console.log(error)
        }
    }

    const handleUpload = (result) => {
       
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
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
                                <Input type='number' className='py-6' placeholder='Set Price' disabled={isLoading}  {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name='description' render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Product Description
                            </FormLabel>
                            <FormControl>
                                <Textarea className='py-2' placeholder='Add Product Description' disabled={isLoading} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                </div>
                <DialogFooter className='py-4'>
                    <CldUploadWidget onUploadAdded={handleUpload} uploadPreset='online_store' signatureEndpoint="/api/cloudinary">
                        {({ open }) => {
                            return (
                                <Button onClick={() => open()} className='mr-auto'>
                                    Add Images <Upload className='ml-4' size={20} />
                                </Button>
                            );
                        }}
                    </CldUploadWidget>
                    <Button type='submit' className='ml-auto'>
                        Review <Check className='ml-4' size={20} />
                    </Button>
                </DialogFooter>
            </form>
        </Form>

    )
}

export default ProductForm