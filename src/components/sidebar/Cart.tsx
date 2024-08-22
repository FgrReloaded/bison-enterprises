import { Trash2 } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from 'next/link'
import { closeSidebar } from '@/lib/slices/sidebarSlice';
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import { CldImage } from 'next-cloudinary'
import { removeFromCart } from '@/actions/cart'
import { toast } from 'sonner'
import { useMutation, useQueryClient } from '@tanstack/react-query'
const Cart = () => {
    const dispatch = useDispatch();
    const data = useSelector((state: RootState) => state.cart)
    const queryClient = useQueryClient();

    const totalPrice = data?.items.reduce((acc, item) => {
        const matchingVariant = item.product.variants.find((variant: any) =>
            Object.keys(item.variant || {}).every(key =>
                variant.variant[key] && variant.variant[key].includes(item?.variant?.[key])
            )
        );
        const price = matchingVariant ?  (matchingVariant as any)?.details.price : item.product.price;
        return acc + price * item.quantity;
    }, 0)

    const { mutate } = useMutation({
        mutationFn: removeFromCart,
        onSuccess: () => {
            queryClient.setQueryData(['cart'], (oldCart: any) => { });

            queryClient.invalidateQueries({
                queryKey: ['cart']
            });
            toast.success('Cart updated successfully');
        },
        onError: (error: any) => {
            console.error(error);
            toast.error('Failed to update cart');
        }
    })

    const handleDelete = (id: string) => {
        mutate({ cartItemId: id })
    }

    return (
        <div className='w-full'>
            <h1 className='text-2xl font-semibold px-4'>Products Cart</h1>
            <ScrollArea className='h-[75vh] w-full'>
                <div className='flex flex-col mt-6 gap-4 px-6'>
                    {
                        data?.items.length === 0 && <div className='flex items-center justify-center h-full w-full'>
                            <p className='text-gray-400'>No items in cart</p>
                        </div>
                    }
                    {
                        data?.items.length > 0 && data?.items.map((item, index) => {
                            const matchingVariant: any = item.product.variants.find((variant: any) =>
                                Object.keys(item.variant || {}).every(key =>
                                    variant.variant[key] && variant.variant[key].includes(item.variant?.[key])
                                )
                            );
                            const price = matchingVariant ? (matchingVariant as any)?.details?.price : item.product.price;
                            return (
                                <div key={index}>
                                    <div className='flex items-center justify-between gap-6'>
                                        <div className='flex justify-between relative w-16 h-16 rounded-lg overflow-hidden'>
                                            <CldImage key={item.id} src={item.product.images[0]} fill style={{ objectFit: "cover", width: "100%", height: "100%" }} alt={item.product.name} />
                                        </div>
                                        <div className='flex flex-col mr-auto'>
                                            <Link onClick={() => { dispatch(closeSidebar()) }} href={`/products/${item.productId}`} className='font-bold'>{item.product.name}</Link>
                                            {
                                                item?.variant && <p className='text-gray-400 mt-1 text-sm flex flex-col'>{Object.keys(item.variant).map((key, index) => {
                                                    return (
                                                        <span className='' key={index}>{key}: {(item?.variant)![key]}</span>
                                                    )
                                                })}</p>
                                            }
                                            <p className='text-gray-400 mt-1 text-sm'>Qty: {item.quantity}</p>
                                        </div>
                                        <div className='flex gap-6 flex-col items-end'>
                                            <p className='text-sm font-semibold'>₹ {price}</p>
                                            <span className='text-red-700 cursor-pointer'>
                                                <Trash2 onClick={() => { handleDelete(item?.id) }} size={20} />
                                            </span>
                                        </div>
                                    </div>
                                    <Separator className='mt-2' />
                                </div>
                            )
                        })}
                </div>
            </ScrollArea>
            <div className='p-4 flex flex-col gap-6 w-full fixed bottom-0 left-0 border-t-1 bg-white shadow-md'>
                <div>
                    <p className='text-md font-semibold flex justify-between'>Subtotal:
                        <span>
                            ₹ {totalPrice}
                        </span>
                    </p>
                    <p className='text-sm text-gray-500'>Shipping and taxes calculated at checkout.</p>

                </div>
                <Link onClick={() => { dispatch(closeSidebar()) }} href="/checkout" className='w-full'>
                    <Button disabled={totalPrice===0} className='w-full'>
                        Checkout
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default Cart
