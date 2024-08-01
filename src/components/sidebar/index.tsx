"use client"

import { X } from 'lucide-react'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { closeSidebar } from '@/lib/slices/sidebarSlice';
import Cart from './Cart';


const SideBar = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector((state: any) => state.sidebar.isOpen);


    return (
        <div className={` h-screen translate-x-[450px] w-[400px] fixed right-0 top-0 z-10 py-4 bg-white shadow-md transition duration-500 ${isOpen && "translate-x-[0px]"}`}>
            <span onClick={() => dispatch(closeSidebar())} className='bg-gray-300 rounded-full absolute -left-12 top-4 p-2 cursor-pointer'>
                <X size={28} />
            </span>
            <Cart />
        </div>
    )
}


export default SideBar