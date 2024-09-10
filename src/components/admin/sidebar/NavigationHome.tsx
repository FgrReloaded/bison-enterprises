"use client"

import React from 'react'
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { closeAdminSidebar } from '@/lib/slices/adminSidebarSlice'


const NavigationHome = () => {
    const dispatch = useDispatch();
    return (
        <div className="relative border-b border-white/20">
        <Link className="flex items-center gap-4 py-6 px-8" href="/">
            <h6 className="flex items-center gap-1 mx-auto antialiased tracking-normal font-sans text-xl font-semibold leading-relaxed text-white">ONLINE<ShoppingCart size={24} />STORE</h6>
        </Link>
        <button onClick={()=>{dispatch(closeAdminSidebar())}} className="middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[32px] h-8 max-h-[32px] rounded-lg text-xs text-white hover:bg-white/10 active:bg-white/30 absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden" type="button">
            <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" aria-hidden="true" className="h-5 w-5 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </span>
        </button>
    </div>
    )
}

export default NavigationHome