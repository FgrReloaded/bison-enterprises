"use client"
import BillBoards from "@/components/billboards";
import FeatureCard from "@/components/ServiceCard";
import Banner from "@/components/Banner";
import QuickCategory from "@/components/category/QuickCategory";
import { MoveRight } from "lucide-react";
import TrendingProducts from "@/components/products/TrendingProducts";
import { FAQ } from "@/components/FAQ";
import Testimonial from "@/components/Testimonial";
import Incentive from "@/components/Incentive";
import ProductCarousel from "@/components/products/ProductCarousel";
import { Roboto } from "next/font/google";


const roboto = Roboto({
    weight: "400", subsets: ["latin"]
});


export default function Home() {

    return (
        <>
            <BillBoards styleType="styleOne" allowedChildren={4} />
            <FeatureCard />
            <section className="py-24">
                <div className="mx-auto px-2 sm:px-4 lg:px-6">
                    <h2 className="font-manrope font-bold text-4xl text-black mb-8 text-center" style={roboto.style}>New Arrival Products</h2>
                    <div>
                        <ProductCarousel />
                    </div>
                </div>
            </section>
            <div className="py-2 md:px-10 px-4">
                <Banner />
            </div>
            <div className="py-4 bg-[#F7F7F8] mt-8">
                <div className="relative md:my-0 my-2">
                    <h1 className="text-center text-4xl p-4 font-semibold">Explore Categories</h1>
                    <span className="text-gray-500 text-sm hover:text-gray-800 flex items-center cursor-pointer gap-2 absolute right-28 md:right-12 md:top-1/2 -translate-y-1/2">All Categories <MoveRight size={15} /> </span>
                </div>
                <QuickCategory />
            </div>
            <div className="py-4 mt-8">
                <div className="relative md:my-0 my-2">
                    <h1 className="text-center text-4xl p-4 font-semibold">Shop Our Trending Items</h1>
                    <span className="text-gray-500 text-sm hover:text-gray-800 flex items-center cursor-pointer gap-2 absolute right-12 md:top-1/2 -translate-y-1/2">All Products <MoveRight size={15} /> </span>
                </div>
                <TrendingProducts />
            </div>
            <Incentive />
            <Testimonial />
            <div className="py-4 mt-8 bg-[#F3F7F2]">
                <div className="flex gap-4 flex-col px-12 mt-4">
                    <h1 className="text-left text-4xl px-4 font-semibold">Frequently Asked Questions</h1>
                    <p className="px-4 text-gray-700">Have a question? Check out our FAQ section for answers to common inquiries.</p>
                </div>
                <FAQ />
            </div>
        </>
    );
}
