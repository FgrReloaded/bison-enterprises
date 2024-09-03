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
import { DialogFooter } from '../ui/dialog';
import { CldImage, CldUploadWidget } from 'next-cloudinary';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '@/lib/slices/modalSlice';
import UpdateProduct from '../UpdateProduct';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Label } from '../ui/label';


const formSchema = z.object({
    title: z.string().min(1, 'Product name is required'),
    description: z.string().min(50, 'Product description is required'),
    price: z.number().min(1, 'Price is required'),
    inStock: z.number().min(1, 'Minimum stock is 1'),
    images: z.array(z.string()).min(4, 'Add at least 4 images').max(6),
    isFeatured: z.boolean().optional(),
    variants: z.array(
        z.object({
            variant: z.record(z.array(z.union([z.string(), z.number()]))),
            details: z.object({
                price: z.number(),
                stock: z.number(),
            }),
        })
    ),
})

const ProductForm = () => {
    const dispatch = useDispatch();
    const { data, type } = useSelector((state: any) => state.modal);
    const [uploadedImages, setUploadedImages] = useState<Array<string>>([]);
    const [addingVariant, setAddingVariant] = useState(false);
    const [newVariants, setNewVariants] = useState<{ [key: string]: string[] }>({} as any);
    const [variantPrice, setVariantPrice] = useState(0);
    const [variantStock, setVariantStock] = useState(0);
    const ref = useRef<HTMLInputElement>(null);

    const form = useForm({
        mode: 'onChange',
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            description: '',
            price: 0,
            inStock: 0,
            images: [] as Array<string>,
            isFeatured: false,
            variants: [] as Array<{ variant: { [key: string]: string[] }, details: { price: number, stock: number } }>
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
                images: form.getValues('images'),
                isFeatured: form.getValues('isFeatured'),
                variants: form.getValues('variants')
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

    }, [data, form]);

    const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
        const price = e.target.value;
        setVariantPrice(Number(price));
    }
    const handleStockChange = (e: ChangeEvent<HTMLInputElement>) => {
        const stock = e.target.value;
        setVariantStock(Number(stock));
    }

    const createVariantType = () => {
        const variantType = ref.current?.value;
        if (!variantType) return;
        setNewVariants((prev) => ({ ...prev, [variantType]: [] }));
        ref.current.value = '';
    }

    const handleVariant = (e: ChangeEvent<HTMLInputElement>, variant: string) => {
        const value = e.target.value;
        if (!value) return;
        setNewVariants({ [variant]: [value] });
    }

    const saveVariants = () => {
        const formVariants = form.getValues('variants');
        const newVariant = {
            variant: newVariants,
            details: {
                price: variantPrice,
                stock: variantStock
            }
        }
        formVariants.push(newVariant);
        form.setValue('variants', formVariants);
        setNewVariants({});
        setVariantPrice(0);
        setVariantStock(0);
    }

    return (
        <Form {...form}>
            <form>
                <div className="space-y-4">
                    <div className='flex gap-8 items-center flex-wrap'>
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
                        <FormField control={form.control} name='price' render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Set Price (INR)
                                </FormLabel>
                                <FormControl>
                                    <Input type='number' className='py-6 w-32' placeholder='Set Price' disabled={isLoading} {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
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
                                    <Input type='number' className='py-6 w-32' placeholder='Set available quantity' disabled={isLoading}  {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
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
                <div className='flex flex-col mt-2 gap-2'>
                    <div className='flex items-center gap-2 flex-wrap'>
                        {
                            Object.keys(newVariants)?.map((variant, index) => {
                                return (
                                    <div key={variant} className='flex items-center gap-2'>
                                        <p>{variant}</p>
                                        <Input type='text' onChange={(e) => { handleVariant(e, variant) }} className='w-64' placeholder='Variants Name (Seperate with ,) ' />
                                    </div>
                                )
                            })
                        }
                        {
                            Object.keys(newVariants)?.length > 0 &&
                            <div className='flex gap-2 items-center'>
                                <Label>Price</Label>
                                <Input onChange={handlePriceChange} type='number' placeholder='Price' value={variantPrice} className='w-32' />
                                <Label>Stock</Label>
                                <Input onChange={handleStockChange} type='number' placeholder='Stock' value={variantStock} className='w-32' />
                            </div>
                        }
                        {
                            Object.keys(newVariants)?.length > 0 ?
                                <Button type='button' onClick={saveVariants} className='ml-auto'>Save Variant</Button> :
                                <Button type='button' onClick={() => { setAddingVariant(true); console.log(newVariants) }} className='ml-auto'>Add Variant</Button>
                        }
                    </div>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Variants</AccordionTrigger>
                            <AccordionContent className='flex gap-4 flex-wrap px-2'>
                                {addingVariant &&
                                    <div className='flex gap-2 mt-2'>
                                        <Input ref={ref} type='text' placeholder='Variant Type' />
                                        <Button type='button' onClick={createVariantType} className='ml-auto'>Create Variant Type</Button>
                                    </div>
                                }
                                {
                                    form.getValues('variants')?.map((variant: any, index: number) => {
                                        return (
                                            <div key={index} className='flex flex-col gap-2'>
                                                {
                                                    Object.keys(variant?.variant)?.map((key) => {
                                                        return (
                                                            <div key={key} className='flex gap-2 ml-2'>
                                                                <p>{key}: </p>
                                                                <p>{variant?.variant[key]?.join(', ')}</p>
                                                            </div>
                                                        )
                                                    })
                                                }
                                                <div className='flex gap-2'>
                                                    <p>Price: {variant?.details?.price}</p>
                                                    <p>Stock: {variant?.details?.stock}</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
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
                    <CldUploadWidget options={{ maxFiles: 6 }} onClose={showUploadedImages} onSuccess={handleUpload} uploadPreset='online_store' signatureEndpoint="/api/cloudinary">
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