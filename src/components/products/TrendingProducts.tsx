"use client"
import React from 'react'
import { ProductCard } from './ProductCard'
import { getFeaturedProducts } from '@/actions/products';
import { useQuery } from '@tanstack/react-query';

const TrendingProducts = () => {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['shop-products'],
    queryFn: () => getFeaturedProducts(),
    initialData: [],
  });
  return (
    <div className='px-4 py-6 flex mx-auto justify-center items-center gap-12 flex-wrap w-[90%]'>
      {products?.map((product: any) => (
        <ProductCard key={product?.id} product={product} />
      ))}
    </div>
  )
}

export default TrendingProducts