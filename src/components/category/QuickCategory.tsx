import Image from 'next/image'
import React from 'react'

const QuickCategory = () => {
  return (
    <div className='grid grid-cols-3 mx-auto gap-8 p-4 w-4/5'>
      <div className='flex items-center justify-center relative cursor-pointer group'>
        <div className="w-[320px] h-[280px] relative overflow-hidden rounded-2xl">
          <Image layout="fill" objectFit="cover" className=" group-hover:scale-125 transition-all  duration-500" src="/assets/dev/quick.jpeg" alt="Jacket image" />
        </div>
        <div className='text-center absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2'>
          <h4 className='text-white text-2xl font-semibold'>Wireless Charging</h4>
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
      <div className='col-span-2 flex items-center justify-center relative cursor-pointer group'>
        <div className="w-[720px] h-[280px] relative overflow-hidden rounded-2xl">
          <Image layout="fill" objectFit="cover" className=" group-hover:scale-125 transition-all  duration-500" src="/assets/dev/quick.jpeg" alt="Jacket image" />
        </div>
        <div className='text-center absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2'>
          <h4 className='text-white text-2xl font-semibold'>Wireless Charging</h4>
          <p className='text-emerald-600 text-lg mt-2'>Qi-Certified Fast Charging Pad</p>
        </div>
      </div>

      <div className='row-span-2 col-start-3 row-start-1 flex items-center justify-center relative cursor-pointer group'>
        <div className="w-[320px] h-[600px] relative overflow-hidden rounded-2xl">
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