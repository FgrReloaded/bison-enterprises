"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '@/lib/slices/modalSlice'
import { useDebouncedCallback } from 'use-debounce';
import { searchProducts } from '@/actions/products'
import { Input } from '../ui/input'
import { CldImage } from 'next-cloudinary'
import Link from 'next/link'

const SearchBar = () => {
    const dispatch = useDispatch();
    const { isOpen, type } = useSelector((state: any) => state.modal);
    const [searchResult, setSearchResult] = useState<any>([]);

    const handleOnClose = () => {
        dispatch(closeModal());
    }

    const isModalOpen = isOpen && type === 'searchProducts';

    const debounced = useDebouncedCallback(
        async (value) => {
            if (value === '') {
                setSearchResult([]);
                return;
            }
            const products = await searchProducts(value);
            setSearchResult(products);
        },
        800
    );

    return (
        <Dialog open={isModalOpen} onOpenChange={handleOnClose}>
            <DialogContent className='px-8 md:px-0'>
                <DialogHeader>
                    <DialogTitle>Search Product</DialogTitle>
                    <DialogDescription>
                        Search for products...
                    </DialogDescription>
                </DialogHeader>
                <Input onChange={(e) => { debounced(e.target.value) }} className='w-full' placeholder='Type a product name' />
                <div className='mt-4'>
                    <div className='flex flex-col gap-2'>
                        {searchResult.map((product: any) => (
                            <Link onClick={()=>{dispatch(closeModal())}} href={`/products/${product.id}`} className='flex gap-2 rounded-lg bg-gray-100 shadow-md py-2 px-4 cursor-pointer' key={product.id}>
                                <div className="relative w-12 h-12">
                                    <CldImage key={product.id} src={product.images[0]} fill style={{ objectFit: "cover", width: "100%", height: "100%" }} alt={product.name} />
                                </div>
                                <div className='flex justify-between w-full px-4'>
                                    <h3 className='text-sm font-semibold hover:text-red-900 transition-all'>{product.name.substr(0, 30)}{product.name.length > 30 && "..."}</h3>
                                    <p className='text-xs font-light'>₹ {product.price}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default SearchBar