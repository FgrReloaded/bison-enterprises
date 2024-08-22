"use client"
import { addToCart } from '@/actions/cart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Cart } from '@prisma/client';
import { JsonValue } from '@prisma/client/runtime/library';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreditCard } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';


interface VariantsProps {
    productVariant: JsonValue[] | undefined;
    price: number | undefined;
    id: string | undefined;
}

const ProductMeta = ({ productVariant, price, id }: VariantsProps) => {
    const [selectedVariants, setSelectedVariants] = useState<{ [key: string]: string }>({});
    const [isValid, setIsValid] = useState(false);
    const queryClient = useQueryClient();


    const selectVariant = (key: string, variant: any) => {
        setSelectedVariants({ ...selectedVariants, [key]: variant });
    }

    const isValidCombination = (): boolean => {
        const matchingVariant = productVariant?.find((variants: any) =>
            Object.keys(variants?.variant).every((variantType: string) =>
                variants.variant[variantType].includes(selectedVariants[variantType as keyof typeof selectedVariants])
            )
        );
        return !!matchingVariant;
    };

    useEffect(() => {
        if (productVariant && productVariant.length > 0) {
            const defaultVariant = (productVariant[0] as any)?.variant;
            const initialVariants: { [key: string]: string } = {};
            Object.keys(defaultVariant).forEach((key) => {
                initialVariants[key] = defaultVariant[key][0];
            });
            setSelectedVariants(initialVariants);
        }
    }, [productVariant]);

    useEffect(() => {
        const isValid = isValidCombination();
        setIsValid(isValid);
    }, [selectedVariants]);

    
    const { mutate } = useMutation({
        mutationFn: addToCart,
        onSuccess: (newCart: Cart) => {
            queryClient.setQueryData(['cart'], (oldCart: any) => {});

            queryClient.invalidateQueries({
                queryKey: ['cart']
            });
            toast.success('Cart updated successfully');
        },
        onError: (error) => {
            console.error(error);
            toast.error('Failed to update cart');
        }
    });

    const createCart = async () => {
        if (!isValid || !id) return;
        mutate({ productId: id, quantity: 1, variant: selectedVariants });
    }

    return (
        <>
            {productVariant?.map((variants: any, index: number) => {
                let variant = variants?.variant;
                return (
                    Object.keys(variant)?.map((key, index) => (
                        <>
                            <h2 className="mt-8 text-base text-gray-900">{key}</h2>
                            <div className="mt-3 flex select-none flex-wrap items-center gap-1">
                                {variant[key]?.map((vary: string) => (
                                    <label className="">
                                        <Input readOnly type="radio" name={key.toLowerCase()} checked={selectedVariants[key] === vary} value={vary} className="peer sr-only" />
                                        <p onClick={() => { selectVariant(key, vary) }} className="cursor-pointer peer-checked:bg-black peer-checked:text-white rounded-lg border border-black px-6 py-2 font-bold">{vary}</p>
                                    </label>
                                ))
                                }
                            </div>
                        </>
                    ))
                )
            })}
            {
                !isValid && <p className='text-sm text-gray-400 mt-2'>This combination is not available</p>
            }
            <div className="mt-10 flex flex-col items-center justify-between space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0">
                <div className="flex items-end">
                    <h1 className="text-3xl font-bold">₹ {price}</h1>
                </div>

                <button onClick={createCart} type="button" className="inline-flex items-center justify-center rounded-md border-2 border-transparent bg-gray-900 bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800">
                    <svg xmlns="http://www.w3.org/2000/svg" className="shrink-0 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    Add to cart
                </button>
            </div>
            <Button variant={"outline"} type="button" className="border-2 border-gray-800 px-12 py-6 mt-12 w-full">
                <CreditCard size={24} className="mr-2" />
                Buy Now
            </Button>
        </>
    )
}

export default ProductMeta