import React from 'react'
import { Separator } from '@/components/ui/separator';
import NavigationItem from './NavigationItem';
import NavigationHome from './NavigationHome';
import { LayoutDashboard, CalendarDays, StretchHorizontal, CircuitBoardIcon, UsersRound, UserMinus, TicketSlash } from 'lucide-react';
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
        {
            name: "Billboards",
            route: "/admin/billboards",
            icon: <CircuitBoardIcon size={22} />

        },
        {
            name: "Banners",
            route: "/admin/banners",
            icon: <TicketSlash size={22} />

        },
        {
            name: "Users",
            route: "/admin/users",
            icon: <UsersRound size={22} />

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
                    <li>
                        <button onClick={() => { signOut({ callbackUrl: "/" }) }} className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize" type="button">
                          <UserMinus size={22} />
                            <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">Logout</p>
                        </button>
                    </li>
                </ul>
            </div>
        </aside>
    )
}

export default NavigationSidebar