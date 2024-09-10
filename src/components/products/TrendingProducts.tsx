"use client"
import React from 'react'
import { ProductCard } from './ProductCard'
import { getFeaturedProducts } from '@/actions/products';
import { useQuery } from '@tanstack/react-query';

const TrendingProducts = () => {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['featured-products'],
    queryFn: () => getFeaturedProducts(),
    initialData: [],
  });

  
  return (
    <div className='py-6 px-2 grid md:grid-cols-4 grid-cols-1 gap-8 md:w-[90%] w-full'>
      {products?.map((product: any) => (
        <ProductCard key={product?.id} product={product} />
      ))}
    </div>
  )
}

export default TrendingProducts