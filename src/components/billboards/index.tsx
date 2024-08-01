"use client"

import React, { useState } from 'react'
import BillBoard from './BillBoard'
import { gridLayout } from '@/lib/constant'

interface Props {
    allowedChildren: number
    styleType: string
}

const BillBoards = ({ allowedChildren, styleType }: Props) => {

    const content = [ // WIP
        {
            src: '/assets/dev/slide01.jpeg',
            data: {
                title: 'Sony 5G Headphone',
                tagline: 'Only Music. Nothing Else.',
            },
            style: {
                left: '2rem',
                transform: 'translateY(-50%) translateX(0%)',
                color: "#fff"
            }
        },
        {
            src: '/assets/dev/Banner-2.jpeg',
            data: {
                title: 'Air Mavic 3',
                tagline: 'As powerful as it is portable',
            },
            style: {
                top: '2rem',
                transform: 'translateX(-50%) translateY(0%)',
                color: "#fff",
                textAlign: 'center'
            }
        },
        {
            src: '/assets/dev/Banner-4.jpeg',
            data: {
                title: 'Handheld',
                tagline: 'USB 3 Rechargeable',
            },
            style: {
                left: '2rem',
                transform: 'translateY(-50%) translateX(0%)',
                color: "#000",
            }
        },
        {
            src: '/assets/dev/Banner-4.jpeg',
            data: {
                title: 'Gearbox',
                tagline: 'Upto 30% Discount',
            },
            style: {
                left: '2rem',
                transform: 'translateY(-50%) translateX(0%)',
                color: "#000"
            }
        }
    ]

    const layoutStyle: any = (() => {
        switch (allowedChildren) {
            case 1:
                return gridLayout["oneItemStyle"];
            case 2:
                return gridLayout["twoItemsStyle"];
            case 3:
                return gridLayout["threeItemsStyle"];
            case 4:
                return gridLayout["fourItemStyle"];
        }
    })();


    const children = Array.from({ length: allowedChildren }).map((_, index) => {
        return <BillBoard key={index} content={content[index]} style={layoutStyle[styleType].children[index]} />
    })


    return (
        <div className='grid gap-6 w-full h-[80vh] p-6' style={gridLayout["fourItemStyle"]["styleOne"].container}>
            {children}
        </div>
    )
}


export default BillBoards