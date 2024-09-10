"use client"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"
import { Button } from "./ui/button"
import Autoplay from "embla-carousel-autoplay"
import { useQuery } from "@tanstack/react-query"
import { getBanners } from "@/actions/admin/banner"
import Link from "next/link"
import { CldImage } from "next-cloudinary"


const Banner = () => {
    const { data: banners, isLoading } = useQuery({
        queryKey: ['banners'],
        queryFn: () => getBanners(),
        initialData: []
    })

    return (
        <Carousel opts={{
            align: "center",
            loop: true,
        }} className="w-full" plugins={[
            Autoplay({
                delay: 2500,
                stopOnInteraction: false
            }),
        ]}>
            <CarouselContent>
                {
                    banners && banners.map((banner: any, idx: number) => (
                        <CarouselItem key={idx}>
                            <div className='bg-gray-400 rounded-xl w-full h-[60vh] relative overflow-hidden'>
                                <CldImage key={banner.id} src={banner.image} fill style={{ objectFit: "cover", width: "100%", height: "100%" }} alt={banner.title} />
                                <div className='absolute top-1/2 md:left-20 left-1/2 md:translate-x-0 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-2'>
                                    <span className="text-emerald-500 text-lg border-b-1 border-b-emerald-500 py-2">{banner.tag}</span>
                                    <h1 className='md:text-5xl text-3xl font-bold w-full'>{banner.title}</h1>
                                    <p className="text-xl mt-4">{banner.tagline}</p>
                                    <Button className='mt-6' variant={'secondary'} asChild>
                                        <Link href={banner.link}>
                                            Shop Now
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </CarouselItem>
                    ))
                }
            </CarouselContent>
        </Carousel >
    )
}

export default Banner