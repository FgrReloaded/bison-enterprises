import { ProductCard } from '@/components/products/ProductCard'
import React from 'react'

const SimilarProducts = () => {
    return (
        <div className='px-4 py-8 mt-12 rounded-lg bg-[#F7F7F8]'>
            <h1 className='text-2xl py-6 text-center font-semibold'>Related Products</h1>
            <div className='flex justify-start items-center flex-wrap gap-4'>
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
            </div>
        </div>
    )
}

export default SimilarProducts