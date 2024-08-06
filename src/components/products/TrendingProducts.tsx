import React from 'react'
import { ProductCard } from './ProductCard'

const TrendingProducts = () => {
  return (
    <div className='px-4 py-6 flex mx-auto justify-center items-center gap-12 flex-wrap w-[90%]'>
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
    </div>
  )
}

export default TrendingProducts