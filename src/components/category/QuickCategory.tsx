"use client"

import { getCategories } from '@/actions/admin/category'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import React from 'react'

const QuickCategory = () => {
  const { data: catetgories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories(),
  })


  return (
    <div className='grid md:grid-cols-3 grid-cols-1 mx-auto gap-8 p-4 w-4/5'>
      <div className='flex items-center justify-center relative cursor-pointer group'>
        <div className="w-[320px] h-[280px] relative overflow-hidden rounded-2xl">
          <Image layout="fill" objectFit="cover" className=" group-hover:scale-125 transition-all  duration-500" src="/assets/dev/quick.jpeg" alt="Jacket image" />
        </div>
        <div className='text-center absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2'>
          <h4 className='text-white text-2xl font-semibold'>{catetgories?.[0]?.name ?? "Category"}</h4>
          <p className='text-emerald-600 text-lg mt-2'>Qi-Certified Fast Charging Pad</p>
        </div>
      </div>
      <div className='flex items-center justify-center relative cursor-pointer group'>
        <div className="w-[320px] h-[280px] relative overflow-hidden rounded-2xl">
          <Image layout="fill" objectFit="cover" className=" group-hover:scale-125 transition-all  duration-500" src="/assets/dev/quick.jpeg" alt="Jacket image" />
        </div>
        <div className='text-center absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2'>
          <h4 className='text-white text-2xl font-semibold'>Wireless Charging</h4>
          <p className='text-emerald-600 text-lg mt-2'>Qi-Certified Fast Charging Pad</p>
        </div>
      </div>
      <div className='md:col-span-2 flex items-center justify-center relative cursor-pointer group'>
        <div className="md:w-[720px] w-[320px] h-[280px] relative overflow-hidden rounded-2xl">
          <Image layout="fill" objectFit="cover" className=" group-hover:scale-125 transition-all  duration-500" src="/assets/dev/quick.jpeg" alt="Jacket image" />
        </div>
        <div className='text-center absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2'>
          <h4 className='text-white text-2xl font-semibold'>Wireless Charging</h4>
          <p className='text-emerald-600 text-lg mt-2'>Qi-Certified Fast Charging Pad</p>
        </div>
      </div>

      <div className='md:row-span-2 md:col-start-3 md:row-start-1 flex items-center justify-center relative cursor-pointer group'>
        <div className="w-[320px] h-[280px] md:h-[600px] relative overflow-hidden rounded-2xl">
          <Image layout="fill" objectFit="cover" className=" group-hover:scale-125 transition-all  duration-500" src="/assets/dev/quick.jpeg" alt="Jacket image" />
        </div>
        <div className='text-center absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2'>
          <h4 className='text-white text-2xl font-semibold'>Wireless Charging</h4>
          <p className='text-emerald-600 text-lg mt-2'>Qi-Certified Fast Charging Pad</p>
        </div>
      </div>

    </div>
  )
}

export default QuickCategory