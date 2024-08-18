"use client"

import { Product } from '@prisma/client'
import { CldImage } from 'next-cloudinary'
import Image from 'next/image'
import React, { useState } from 'react'

const ProductImages = (images: any) => {
    const [activeImage, setActiveImage] = useState(images.images[0]);

    const handleSlide = (index: number)=>{
        const temp = activeImage;
        setActiveImage(images.images[index]);
        images.images[index] = temp;
    }

    return (
        <div className="lg:flex lg:items-start">
            <div className="lg:order-2 lg:ml-5">
                <div className="w-[650px] h-[600px] overflow-hidden relative">
                    {
                        <CldImage fill className="rounded-lg" style={{ objectFit: "cover" }} src={activeImage} alt="product" />
                    }
                </div>
            </div>

            <div className="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0">
                <div className="flex flex-row items-start lg:flex-col">
                    {
                        images?.images.slice(1, 6).map((image: any, index: number) => (
                            <button  key={index} type="button" className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-gray-900 text-center relative">
                                <CldImage onClick={()=>{handleSlide(index+1)}} fill style={{ objectFit: "cover" }} className="h-full w-full object-cover" src={image} alt="image" />
                            </button>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default ProductImages