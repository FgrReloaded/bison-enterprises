import {  Trash2 } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from 'next/link'
import { closeSidebar } from '@/lib/slices/sidebarSlice';
import { useDispatch } from 'react-redux'



const Cart = () => {
    const dispatch = useDispatch();

    return (
        <div className='w-full'>
            <h1 className='text-2xl font-semibold px-4'>Products Cart</h1>
            <ScrollArea className='h-[75vh] w-full'>
                <div className='flex flex-col mt-6 gap-4 px-6'>
                    <div className='flex items-center justify-between gap-6'>
                        <div className='flex justify-between relative w-16 h-16 rounded-lg overflow-hidden'>
                            <Image src='/assets/dev/slide01.jpeg' layout="fill" objectFit='cover' alt='product' />
                        </div>
                        <div className='flex flex-col mr-auto'>
                            <p className='font-bold'>Product Name</p>
                            <p className='text-sm text-gray-600'>Category</p>
                            <p className='text-gray-400 mt-1 text-sm'>Qty: 1</p>
                        </div>
                        <div className='flex gap-6 flex-col items-end'>
                            <p className='text-sm font-semibold'>₹ 80.00</p>
                            <span className='text-red-700 cursor-pointer'>
                                <Trash2 size={20} />
                            </span>
                        </div>
                    </div>
                    <Separator />
                    <div className='flex items-center justify-between gap-6'>
                        <div className='flex justify-between relative w-16 h-16 rounded-lg overflow-hidden'>
                            <Image src='/assets/dev/slide01.jpeg' layout="fill" objectFit='cover' alt='product' />
                        </div>
                        <div className='flex flex-col mr-auto'>
                            <p className='font-bold'>Product Name</p>
                            <p className='text-sm text-gray-600'>Category</p>
                            <p className='text-gray-400 mt-1 text-sm'>Qty: 1</p>
                        </div>
                        <div className='flex gap-6 flex-col items-end'>
                            <p className='text-sm font-semibold'>₹ 80.00</p>
                            <span className='text-red-700 cursor-pointer'>
                                <Trash2 size={20} />
                            </span>
                        </div>
                    </div>
                    <Separator />
                    <div className='flex items-center justify-between gap-6'>
                        <div className='flex justify-between relative w-16 h-16 rounded-lg overflow-hidden'>
                            <Image src='/assets/dev/slide01.jpeg' layout="fill" objectFit='cover' alt='product' />
                        </div>
                        <div className='flex flex-col mr-auto'>
                            <p className='font-bold'>Product Name</p>
                            <p className='text-sm text-gray-600'>Category</p>
                            <p className='text-gray-400 mt-1 text-sm'>Qty: 1</p>
                        </div>
                        <div className='flex gap-6 flex-col items-end'>
                            <p className='text-sm font-semibold'>₹ 80.00</p>
                            <span className='text-red-700 cursor-pointer'>
                                <Trash2 size={20} />
                            </span>
                        </div>
                    </div>
                    <Separator />
                    <div className='flex items-center justify-between gap-6'>
                        <div className='flex justify-between relative w-16 h-16 rounded-lg overflow-hidden'>
                            <Image src='/assets/dev/slide01.jpeg' layout="fill" objectFit='cover' alt='product' />
                        </div>
                        <div className='flex flex-col mr-auto'>
                            <p className='font-bold'>Product Name</p>
                            <p className='text-sm text-gray-600'>Category</p>
                            <p className='text-gray-400 mt-1 text-sm'>Qty: 1</p>
                        </div>
                        <div className='flex gap-6 flex-col items-end'>
                            <p className='text-sm font-semibold'>₹ 80.00</p>
                            <span className='text-red-700 cursor-pointer'>
                                <Trash2 size={20} />
                            </span>
                        </div>
                    </div>
                </div>
            </ScrollArea>
            <div className='p-4 flex flex-col gap-6 w-full fixed bottom-0 left-0 border-t-1 bg-white shadow-md'>
                <div>
                    <p className='text-md font-semibold flex justify-between'>Subtotal:
                        <span>
                            ₹ 160.00
                        </span>
                    </p>
                    <p className='text-sm text-gray-500'>Shipping and taxes calculated at checkout.</p>

                </div>
                <Link onClick={()=>{dispatch(closeSidebar())}} href="/checkout" className='w-full'>
                <Button  className='w-full'>
                    Checkout
                </Button>
                </Link>
            </div>
        </div>
    )
}



export default Cart