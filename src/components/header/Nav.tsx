import Link from 'next/link'
import React from 'react'


const Nav = () => {

    return (
        <header className="py-4 px-4 flex items-center justify-between bg-gray-400">
            <aside className="flex items-center gap-[2px]">
               <nav>
                    <ul className='flex gap-8 items-center ml-5 tracking-wider'>
                        <li className='text-gray-950 font-bold'>
                            <Link href="/">Home</Link>
                        </li>
                        <li>
                            <Link href="/">Products</Link>
                        </li>
                        <li>
                            <Link href="/">Collections</Link>
                        </li>
                        <li>
                            <Link href="/">Wishlist</Link>
                        </li>
                        <li>
                            <Link href="/">Contact Us</Link>
                        </li>
                        <li>
                            <Link href="/">About Us</Link>
                        </li>
                    </ul>
               </nav>
            </aside>
        </header>

    )
}

export default Nav