"use client"

import { Heart, ShoppingCart, View } from "lucide-react"
import Link from "next/link"
import { CldImage } from "next-cloudinary"
import { addToWishlist } from "@/actions/wishlist"
import { toast } from "sonner"

interface ProductCardProps {
    id: string;
    name: string;
    price: number;
    images: string[];
}


export const ProductCard = ({ product,isWishlist }: { product: ProductCardProps, isWishlist?:boolean }) => {


    return (
        <div className="relative bg-cover group rounded-3xl bg-center mx-auto sm:mr-0 xl:mx-auto cursor-pointer">
            <span className="p-3 z-10 rounded-full bg-gray-800 absolute right-3 top-3">
                <ShoppingCart className="text-white" size={20} />
            </span>
            <span onClick={() => { addToWishlist(product?.id); toast.success("Wishlist updated") }} className="p-3 z-10 rounded-full bg-gray-200 absolute left-3 top-3 opacity-0 group-hover:opacity-100 transition-all duration-500">
                {
                    isWishlist ? <Heart className="text-red-500" size={20} /> : <Heart size={20} />
                }
            </span>
            <div className="w-[95vw] md:w-[310px] h-[290px] relative">
                <CldImage key={product?.id} src={product?.images[0]} fill style={{ objectFit: "cover", width: "100%", height: "100%", borderRadius: "1rem" }} alt={product?.name} />
            </div>
            <Link href={`/products/${product?.id}`} className="absolute z-10 bottom-3 mx-3 p-3 bg-white w-[calc(100%-24px)] rounded-xl shadow-sm shadow-transparent transition-all duration-500 group-hover:shadow-indigo-200 group-hover:bg-indigo-50">
                <div className="flex items-center justify-between mb-2">
                    <h6 className="font-semibold text-base leading-7 text-black ">{product?.name.substring(0, 25) + "..."}

                    </h6>
                    <h6 className="font-semibold text-base leading-7 text-indigo-600 text-right">₹{product?.price}</h6>
                </div>
                <p className="text-xs leading-5 text-gray-500">Women&apos;s Winter Wear</p>
            </Link>
        </div>
    )
}