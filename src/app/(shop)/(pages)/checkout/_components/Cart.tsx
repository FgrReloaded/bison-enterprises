"use client"
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CldImage } from "next-cloudinary";
import Image from "next/image";

interface CartProps {
    data: any;
}

export function Cart({ data }: CartProps) {
    return (
        <>
            <div className="grid grid-cols-12 mt-8 max-md:hidden pb-6 border-b border-gray-200">
                <div className="col-span-12 md:col-span-7">
                    <p className="font-normal text-lg leading-8 text-gray-400">Product Details</p>
                </div>
                <div className="col-span-12 md:col-span-5">
                    <div className="grid grid-cols-5">
                        <div className="col-span-3">
                            <p className="font-normal text-lg leading-8 text-gray-400 text-center">Quantity</p>
                        </div>
                        <div className="col-span-2">
                            <p className="font-normal text-lg leading-8 text-gray-400 text-center">Total</p>
                        </div>
                    </div>
                </div>
            </div>
            <ScrollArea className="h-[75vh] w-full px-4">
                <div>
                    {data?.items.length > 0 && data?.items.map((item: any, index: number) => {
                        const matchingVariant: any = item.product.variants.find((variant: any) =>
                            Object.keys(item.variant || {}).every(key =>
                                variant.variant[key] && variant.variant[key].includes(item.variant?.[key])
                            )
                        );
                        const price = matchingVariant ? (matchingVariant as any)?.details?.price : item.product.price;
                        return (
                            <div
                                className="flex flex-col min-[500px]:flex-row min-[500px]:items-center gap-4 py-6  border-b border-gray-200 group">
                                <div className="w-full md:max-w-[126px] relative h-32">
                                    <CldImage key={item?.id} src={item.product.images[0]} fill style={{ objectFit: "cover", width: "100%", height: "100%" }} alt={item.product.name} />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-4 w-full">
                                    <div className="md:col-span-2">
                                        <div className="flex flex-col max-[500px]:items-center gap-3">
                                            <h6 className="font-semibold text-base leading-7 text-black">{item.product.name}</h6>
                                            {
                                                item?.variant && <p className='text-gray-400 mt-1 text-sm flex flex-col'>{Object.keys(item.variant).map((key, index) => {
                                                    return (
                                                        <span className='' key={index}>{key}: {(item?.variant)![key]}</span>
                                                    )
                                                })}</p>
                                            }
                                            <h6 className="font-medium text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-indigo-600">₹ {price}</h6>
                                        </div>
                                    </div>
                                    <div className="flex items-center max-[500px]:justify-center h-full max-md:mt-3">
                                        <div className="flex items-center h-full">
                                            <button
                                                className="group rounded-l-xl px-5 py-[8px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300">
                                                <svg className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                                                    xmlns="http://www.w3.org/2000/svg" width="22" height="22"
                                                    viewBox="0 0 22 22" fill="none">
                                                    <path d="M16.5 11H5.5" stroke="" strokeWidth="1.6"
                                                        strokeLinecap="round" />
                                                    <path d="M16.5 11H5.5" stroke="" strokeOpacity="0.2" strokeWidth="1.6"
                                                        strokeLinecap="round" />
                                                    <path d="M16.5 11H5.5" stroke="" strokeOpacity="0.2" strokeWidth="1.6"
                                                        strokeLinecap="round" />
                                                </svg>
                                            </button>
                                            <Input type="text"
                                                className="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[73px] min-w-[60px] placeholder:text-gray-900 py-[15px]  text-center bg-transparent"
                                                placeholder="1" value={item?.quantity} />
                                            <button
                                                className="group rounded-r-xl px-5 py-[8px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300">
                                                <svg className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                                                    xmlns="http://www.w3.org/2000/svg" width="22" height="22"
                                                    viewBox="0 0 22 22" fill="none">
                                                    <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" strokeWidth="1.6"
                                                        strokeLinecap="round" />
                                                    <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" strokeOpacity="0.2"
                                                        strokeWidth="1.6" strokeLinecap="round" />
                                                    <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" strokeOpacity="0.2"
                                                        strokeWidth="1.6" strokeLinecap="round" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex items-center max-[500px]:justify-center md:justify-end max-md:mt-3 h-full">
                                        <p className="font-bold text-lg leading-8 text-gray-600 text-center transition-all duration-300 group-hover:text-indigo-600">₹ {price*item?.quantity}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </ScrollArea>

        </>
    )
}