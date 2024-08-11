import { AlignRight, Headset, LoaderCircle, LogOut, Search, ShoppingCart, UserRound } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger,
} from "@/components/ui/menubar"
import { signOut, useSession } from 'next-auth/react'
import { useDispatch } from 'react-redux';
import { openSidebar } from '@/lib/slices/sidebarSlice';

const Navbar = () => {
    const { data: session, status } = useSession();
    const dispatch = useDispatch();

    return (
        <header className="py-4 px-4 flex items-center justify-between">
            <aside className="flex items-center gap-[2px]">
                <p className="text-xl font-bold ">ONLINE</p>
                <ShoppingCart size={20} />
                <p className="text-xl font-bold">STORE</p>
            </aside>
            <nav className="relative">
                <Input className='focus-visible:ring-0 focus-visible:ring-offset-0 border-2 rounded-xl md:w-[30vw] p-6 text-lg' placeholder="Search Products" />
                <span className='absolute border-1 border-gray-400 rounded-full p-2 right-2 top-1/2 -translate-y-1/2 cursor-pointer'>
                    <Search size={20} />
                </span>
            </nav>
            <aside className="flex items-center gap-4 px-2">
                <div className='flex items-center gap-x-4 border-1 border-gray-400 rounded-full py-1 px-6'>
                    <span>
                        <Headset size={25} />
                    </span>
                    <div className='flex flex-col'>
                        <span className='text-md'>Need help? Call us:</span>
                        <span className='text-md tracking-wider'>+91 1234567890</span>
                    </div>
                </div>
                {session && session.user.role !== "ADMIN" &&
                    <Button onClick={() => { dispatch(openSidebar()) }} className='rounded-full relative'>
                        <ShoppingCart size={20} />
                        <span className='absolute -top-2 -right-2 text-black rounded-full text-sm'>
                            <Badge className='hover:bg-destructive' variant={'destructive'}>0</Badge>
                        </span>
                    </Button>
                }
                {
                    status === "loading" && <span className='animate-spin'>
                        <LoaderCircle size={20} />
                    </span>
                }
                {session && session.user.role === "ADMIN" &&
                    <Link  href={"/admin"}>
                        <Button className='rounded-full'>
                            Dashboard
                        </Button>
                    </Link>
                }
                {
                    status === 'authenticated' && session.user.id && session.user.role !== "ADMIN" &&
                    <Menubar className='border-none'>
                        <MenubarMenu>
                            <MenubarTrigger asChild>
                                <Button className='rounded-full gap-2 cursor-pointer' variant={"outline"}>
                                    <UserRound size={20} />
                                    Account
                                </Button>
                            </MenubarTrigger>
                            <MenubarContent className='mr-6'>
                                <Link className='w-full' href={"/orders"}>
                                    <MenubarItem className='cursor-pointer'>
                                        Orders
                                    </MenubarItem>
                                </Link>                                <MenubarSeparator />
                                <Link className='w-full' href={"/account"}>
                                    <MenubarItem className='cursor-pointer'>
                                        Profile
                                    </MenubarItem>
                                </Link>
                                <MenubarSeparator />
                                <MenubarItem onClick={() => { signOut({ callbackUrl: "/" }) }} className='flex justify-between cursor-pointer'>Logout <LogOut size={20} /></MenubarItem>
                            </MenubarContent>
                        </MenubarMenu>
                    </Menubar>
                }
                {status === 'unauthenticated' && <Link href={"/sign-in"} >
                    <Button className='rounded-full'>
                        Login
                    </Button>
                </Link>}

                {/* <AlignRight className="md:hidden" /> */}
            </aside>
        </header>

    )
}

export default Navbar