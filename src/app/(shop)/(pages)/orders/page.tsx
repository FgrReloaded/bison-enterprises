import { Button } from "@/components/ui/button";
import { Heading } from "./_components/Heading";


export default function Order() {

    return (
        <section>
            <div className="py-10 bg-[#fafafa]">
                <Heading />
            </div>

            <div className="py-10 bg-white sm:pb-16 lg:pb-20">
                <div className="mx-auto lg:px-8 max-w-7xl">
                    <div className="flow-root">
                        <ul className="lg:my-0 sm:-my-12 -my-8 flex flex-col gap-4">
                            <li className="px-4 py-8 sm:px-6 sm:py-12 lg:px-0 lg:py-0">
                                <div className="flex lg:items-center sm:items-start sm:justify-between">
                                    <div className="lg:flex gap-8 lg:items-center">
                                        <p className="text-sm font-medium text-[#71717a]">Order ID: <span className="font-bold text-[#18181b]">46199271460087</span></p>

                                        <p className="text-sm font-medium text-[#71717a]">Date: <span className="font-bold text-[#18181b]">03 January, 2022</span></p>

                                        <p className="text-sm font-medium text-[#71717a]">Order Status: <span className="font-bold text-[#18181b]">Waiting for Shipping</span></p>
                                    </div>

                                    <div className="mt-8 sm:mt-0 flex gap-4 sm:flex-row flex-col">
                                        <Button variant={"outline"} type="button" className="inline-flex items-center justify-center px-4 py-2 text-sm font-bold text-[#18181b] transition-all duration-200 bg-white bj lj rounded xp yp eq bq dp">
                                            View Invoice
                                        </Button>
                                        <Button variant={"outline"} type="button" className="inline-flex items-center justify-center px-4 py-2 text-sm font-bold text-[#18181b] transition-all duration-200 bg-white bj lj rounded xp yp eq bq dp">
                                            View Order
                                        </Button>
                                    </div>
                                </div>

                                <hr className="border-[#e4e4e7] mt-7" />

                                <ul className="flex flex-col gap-4 mt-7">
                                    <li className="flex sm:items-start sm:justify-between ">
                                        <div className="flex items-stretch flex-1">
                                            <div className="flex-shrink-0">
                                                <img className="object-cover rounded-md w-28 h-28" src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/order-details/1/product-1.png" alt="" />
                                            </div>

                                            <div className="flex flex-col justify-between ml-5">
                                                <div className="flex-1">
                                                    <p className="text-base font-bold text-[#18181b]">Apple Watch Series 7</p>
                                                    <p className="mt-2 text-sm font-medium text-[#71717a]">Golden</p>
                                                </div>

                                                <p className="mt-4 text-sm font-medium text-[#71717a]">$359</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-start mt-5 sh sm:mt-0 sm:justify-end">
                                            <a href="#" title="" className="p-1 -m-1 text-sm font-medium text-[#71717a] transition-all duration-200 rounded jp xp yp eq aq"> View Product </a>
                                        </div>
                                    </li>

                                    <li className="flex sm:items-start sm:justify-between ">
                                        <div className="flex items-stretch flex-1">
                                            <div className="flex-shrink-0">
                                                <img className="object-cover rounded-md w-28 h-28" src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/order-details/1/product-2.png" alt="" />
                                            </div>

                                            <div className="flex flex-col justify-between ml-5">
                                                <div className="flex-1">
                                                    <p className="text-base font-bold text-[#18181b]">Beylob 90 Speaker</p>
                                                    <p className="mt-2 text-sm font-medium text-[#71717a]">Space Gray</p>
                                                </div>

                                                <p className="mt-4 text-sm font-medium text-[#71717a]">$49</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-start mt-5 sh sm:mt-0 sm:justify-end">
                                            <a href="#" title="" className="p-1 -m-1 text-sm font-medium text-[#71717a] transition-all duration-200 rounded jp xp yp eq aq"> View Product </a>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                            <hr className="border-[#101013] mt-7" />
                            <li className="px-4 py-8 sm:px-6 sm:py-12 lg:px-0 lg:py-0">
                                <div className="flex lg:items-center sm:items-start sm:justify-between">
                                    <div className="lg:flex gap-8 lg:items-center">
                                        <p className="text-sm font-medium text-[#71717a]">Order ID: <span className="font-bold text-[#18181b]">46199271460087</span></p>

                                        <p className="text-sm font-medium text-[#71717a]">Date: <span className="font-bold text-[#18181b]">03 January, 2022</span></p>

                                        <p className="text-sm font-medium text-[#71717a]">Order Status: <span className="font-bold text-[#18181b]">Waiting for Shipping</span></p>
                                    </div>

                                    <div className="mt-8 sm:mt-0 flex gap-4 sm:flex-row flex-col">
                                        <Button variant={"outline"} type="button" className="inline-flex items-center justify-center px-4 py-2 text-sm font-bold text-[#18181b] transition-all duration-200 bg-white bj lj rounded xp yp eq bq dp">
                                            View Invoice
                                        </Button>
                                        <Button variant={"outline"} type="button" className="inline-flex items-center justify-center px-4 py-2 text-sm font-bold text-[#18181b] transition-all duration-200 bg-white bj lj rounded xp yp eq bq dp">
                                            View Order
                                        </Button>
                                    </div>
                                </div>

                                <hr className="border-[#e4e4e7] mt-7" />

                                <ul className="flex flex-col gap-4 mt-7">
                                    <li className="flex sm:items-start sm:justify-between ">
                                        <div className="flex items-stretch flex-1">
                                            <div className="flex-shrink-0">
                                                <img className="object-cover rounded-md w-28 h-28" src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/order-details/1/product-1.png" alt="" />
                                            </div>

                                            <div className="flex flex-col justify-between ml-5">
                                                <div className="flex-1">
                                                    <p className="text-base font-bold text-[#18181b]">Apple Watch Series 7</p>
                                                    <p className="mt-2 text-sm font-medium text-[#71717a]">Golden</p>
                                                </div>

                                                <p className="mt-4 text-sm font-medium text-[#71717a]">$359</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-start mt-5 sh sm:mt-0 sm:justify-end">
                                            <a href="#" title="" className="p-1 -m-1 text-sm font-medium text-[#71717a] transition-all duration-200 rounded jp xp yp eq aq"> View Product </a>
                                        </div>
                                    </li>

                                    <li className="flex sm:items-start sm:justify-between ">
                                        <div className="flex items-stretch flex-1">
                                            <div className="flex-shrink-0">
                                                <img className="object-cover rounded-md w-28 h-28" src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/order-details/1/product-2.png" alt="" />
                                            </div>

                                            <div className="flex flex-col justify-between ml-5">
                                                <div className="flex-1">
                                                    <p className="text-base font-bold text-[#18181b]">Beylob 90 Speaker</p>
                                                    <p className="mt-2 text-sm font-medium text-[#71717a]">Space Gray</p>
                                                </div>

                                                <p className="mt-4 text-sm font-medium text-[#71717a]">$49</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-start mt-5 sh sm:mt-0 sm:justify-end">
                                            <a href="#" title="" className="p-1 -m-1 text-sm font-medium text-[#71717a] transition-all duration-200 rounded jp xp yp eq aq"> View Product </a>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
