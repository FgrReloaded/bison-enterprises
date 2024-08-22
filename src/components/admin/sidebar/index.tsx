import React from 'react'
import { Separator } from '@/components/ui/separator';
import NavigationItem from './NavigationItem';
import NavigationHome from './NavigationHome';
import { LayoutDashboard, CalendarDays, StretchHorizontal } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react'



const NavigationSidebar = () => {

    const menuItems = [
        {
            name: "Dashboard",
            route: "/admin",
            icon: <LayoutDashboard size={22} />
        },
        {
            name: "Products",
            route: "/admin/products",
            icon: <StretchHorizontal size={22} />

        },
        {
            name: "Orders",
            route: "/admin/orders",
            icon: <CalendarDays size={22} />

        },
    ]


    return (
        <aside className="bg-gradient-to-br from-gray-800 to-gray-900 -translate-x-80 fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0">
            <NavigationHome />
            <div className="m-4">
                <ul className="mb-4 flex flex-col gap-1">
                    {menuItems.map((item) => {
                        return (
                            <NavigationItem key={item.route} name={item.name} icon={item.icon} route={item.route} />
                        )
                    })}
                </ul>
                <ul className="mb-4 flex flex-col gap-1">
                    <li className="mx-3.5 mt-4 mb-2">
                        <p className="block antialiased font-sans text-sm leading-normal text-white font-black uppercase opacity-75">auth pages</p>
                    </li>
                    <li>
                        <button className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize" type="button">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-5 h-5 text-inherit">
                                <path fillRule="evenodd" d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z" clipRule="evenodd"></path>
                            </svg>
                            <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">sign in</p>
                        </button>
                    </li>
                    <li>
                        <button onClick={() => { signOut({ callbackUrl: "/" }) }} className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize" type="button">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-5 h-5 text-inherit">
                                <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z"></path>
                            </svg>
                            <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">Logout</p>
                        </button>
                    </li>
                </ul>
            </div>
        </aside>
    )
}

export default NavigationSidebar