import { EyeIcon, ShoppingBasket, ShoppingCart, ShoppingCartIcon, View } from "lucide-react"
import Image from "next/image"
import ActionTooltip from "../modals/ActionTooltip"
import Link from "next/link"
import { Product } from "@prisma/client"

export const ProductCard = ({product}: {product: Product}) => {
    return (
        <div className="relative bg-cover group rounded-3xl bg-center overflow-hidden mx-auto sm:mr-0 xl:mx-auto cursor-pointer">
            <span className="p-3 z-10 rounded-full bg-gray-800 absolute right-3 top-3">
                <ShoppingCart className="text-white" size={20} />
            </span>
            <ActionTooltip label="Quick View" side="top" align="center">
                <span className="p-3 z-10 rounded-full bg-gray-200 absolute left-3 top-3 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <View size={20} />
                </span>
            </ActionTooltip>
            <div className="w-[280px] h-[290px] relative">
                <Image layout="fill" objectFit="cover" className="rounded-2xl" src="/assets/dev/slide01.jpeg" alt="Jacket image" />
            </div>
            <Link href={`/products/${product?.id}`} className="absolute z-10 bottom-3 mx-3 p-3 bg-white w-[calc(100%-24px)] rounded-xl shadow-sm shadow-transparent transition-all duration-500 group-hover:shadow-indigo-200 group-hover:bg-indigo-50">
                <div className="flex items-center justify-between mb-2">
                    <h6 className="font-semibold text-base leading-7 text-black ">{product?.name}</h6>
                    <h6 className="font-semibold text-base leading-7 text-indigo-600 text-right">₹{product?.price}</h6>
                </div>
                <p className="text-xs leading-5 text-gray-500">Women's Winter Wear</p>
            </Link>
        </div>
    )
}