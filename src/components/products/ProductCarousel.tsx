"use client"

import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'
import { ProductCard } from './ProductCard'
import { useQuery } from '@tanstack/react-query'
import { getProducts } from '@/actions/products'
import { Product } from '@prisma/client'
import { SquareDashedKanban } from 'lucide-react'

const ProductCarousel = () => {
    const { data: products, isLoading, error } = useQuery({
        queryKey: ['shop-products'],
        queryFn: async () => getProducts(),
        initialData: [],
    });
    if (isLoading) {
        return (
            <div>
                ...Loading
            </div>
        )
    }
    if (products.length === 0) {
        return (
            <div className='w-full flex items-center justify-center flex-col gap-6 mt-6'>
                <SquareDashedKanban size={48} className='text-gray-500 dark:text-gray-400' />
                <span className='text-gray-500 dark:text-gray-400 uppercase text-4xl font-extrabold'>No products found</span>
            </div>
        )
    }
    

    return (
        <Carousel opts={{
            align: "start",
            loop: true,
        }} className="w-full" >
            <CarouselContent>
                {products?.map((product: any) => (
                    <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-[24%]">
                        <ProductCard product={product} />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext
            />
        </Carousel>
    )
}

export default ProductCarousel