"use client"

import React, { useState } from 'react'
import BillBoard from './BillBoard'
import { gridLayout } from '@/lib/constant'
import { useQuery } from '@tanstack/react-query'
import { getBillboards } from '@/actions/admin/billboards'

interface Props {
    allowedChildren: number
    styleType: string
}

const BillBoards = ({ allowedChildren, styleType }: Props) => {
    const { data: billboards, isLoading } = useQuery({
        queryKey: ['billboards'],
        queryFn: () => getBillboards(),
        initialData: []
    })

    if (isLoading) {
        return (
            <div className="flex flex-col justify-center w-full h-full">
                <h1 className="text-3xl font-bold">Billboards</h1>
                <p>Loading...</p>
            </div>
        )
    }

    const content = [ // WIP
        {
            src: billboards[0]?.image,
            data: {
                title: billboards[0]?.title,
                tagline: billboards[0]?.tagline,
                link: billboards[0]?.link
            },
            style: {
                left: '2rem',
                transform: 'translateY(-50%) translateX(0%)',
                color: "#fff"
            }
        },
        {
            src: billboards[1]?.image,
            data: {
                title: billboards[1]?.title,
                tagline: billboards[1]?.tagline,
                link: billboards[1]?.link
            },
            style: {
                top: '2rem',
                transform: 'translateX(-50%) translateY(0%)',
                color: "#fff",
                textAlign: 'center'
            }
        },
        {
            src: billboards[2]?.image,
            data: {
                title: billboards[2]?.title,
                tagline: billboards[2]?.tagline,
                link: billboards[2]?.link
            },
            style: {
                left: '2rem',
                transform: 'translateY(-50%) translateX(0%)',
                color: "#000",
            }
        },
        {
            src: billboards[3]?.image,
            data: {
                title: billboards[3]?.title,
                tagline: billboards[3]?.tagline,
                link: billboards[3]?.link
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
        <div className='grid gap-6 w-full h-[80vh] p-6 bg-[#F7F7F8]' style={gridLayout["fourItemStyle"]["styleOne"].container}>
            {children}
        </div>
    )
}


export default BillBoards