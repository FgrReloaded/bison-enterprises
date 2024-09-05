"use client"
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'


const Nav = () => {
    const pathname = usePathname()
    return (
        <header className="py-4 px-4 flex items-center justify-between bg-gray-400">
            <aside className="flex items-center gap-[2px]">
                <nav>
                    <ul className='flex gap-8 items-center ml-5 tracking-wider'>
                        <li className={cn(pathname==="/" && 'text-gray-950 font-bold')}>
                            <Link href="/">Home</Link>
                        </li>
                        <li className={cn(pathname==="/products" && 'text-gray-950 font-bold')}>
                            <Link href="/products">Products</Link>
                        </li>
                        <li className={cn(pathname==="/wishlist" && 'text-gray-950 font-bold')}>
                            <Link href="/wishlist">Wishlist</Link>
                        </li>
                        <li className={cn(pathname==="/contact" && 'text-gray-950 font-bold')}>
                            <Link href="/contact">Contact Us</Link>
                        </li>   
                        <li className={cn(pathname==="/about" && 'text-gray-950 font-bold')}>
                            <Link href="/about">About Us</Link>
                        </li>
                    </ul>
                </nav>
            </aside>
        </header>

    )
}

export default Nav