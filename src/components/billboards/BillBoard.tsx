import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import { CldImage } from 'next-cloudinary'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface LayoutAndContent {
    style: React.CSSProperties,
    content: any,
    gridNames: string
}

const BillBoard = ({ style, content, gridNames }: LayoutAndContent) => {
    return (
        <div className={cn('bg-gray-400 rounded-xl w-full h-full relative overflow-hidden', gridNames)} >
            <CldImage key={content.src} src={content.src} fill style={{ objectFit: "cover", width: "100%", height: "100%" }} alt={content.title} />
            <div className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col gap-2' style={content.style}>
                <h1 className='text-2xl font-bold'>{content.data.title}</h1>
                <p>{content.data.tagline}</p>
                <Button asChild className='mt-6' variant={'secondary'}>
                    <Link href={`${content.data.link}`}  target='_blank'>
                        Shop Now
                    </Link>
                </Button>
            </div>
        </div>
    )
}



export default BillBoard