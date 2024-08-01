import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'

interface LayoutAndContent {
    style: React.CSSProperties,
    content: any
}

const BillBoard = ({ style, content }: LayoutAndContent) => {

    return (
        <div className='bg-gray-400 rounded-xl w-full h-full relative' style={style}>
            <Image src={content.src} layout="fill" objectFit="cover" className='rounded-xl' alt='billboard' />
            <div className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col gap-2' style={content.style}>
                <h1 className='text-2xl font-bold'>{content.data.title}</h1>
                <p>{content.data.tagline}</p>
                <Button className='mt-6' variant={'secondary'}>Shop Now</Button>
            </div>
        </div>
    )
}



export default BillBoard