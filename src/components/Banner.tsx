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


const Banner = () => {
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
                <CarouselItem >
                    <div className='bg-gray-400 rounded-xl w-full h-[60vh] relative'>
                        <Image src="/assets/dev/banner.jpeg" layout="fill" objectFit="cover" className='rounded-xl' alt='billboard' />
                        <div className='absolute top-1/2 left-20 -translate-y-1/2 flex flex-col gap-2'>
                        <span className="text-emerald-500 text-lg border-b-1 border-b-emerald-500 py-2">Experience Sound</span>
                        <h1 className='text-5xl font-bold'>Freedom with AirPods</h1>
                            <p className="text-xl mt-4">Unleash Wireless Sound Freedom</p>
                            <Button className='mt-6' variant={'secondary'}>Shop Now</Button>
                        </div>
                    </div>
                </CarouselItem>

                <CarouselItem >
                <div className='bg-gray-400 rounded-xl w-full h-[60vh] relative'>
                        <Image src="/assets/dev/banner.jpeg" layout="fill" objectFit="cover" className='rounded-xl' alt='billboard' />
                        <div className='absolute top-1/2 left-20 -translate-y-1/2 flex flex-col gap-2'>
                            <span className="text-emerald-500 text-lg border-b-1 border-b-emerald-500 py-2">Experience Sound</span>
                            <h1 className='text-5xl font-bold'>Freedom with AirPods</h1>
                            <p className="text-xl mt-4">Unleash Wireless Sound Freedom</p>
                            <Button className='mt-6' variant={'secondary'}>Shop Now</Button>
                        </div>
                    </div>
                </CarouselItem>
            </CarouselContent>
        </Carousel>
    )
}

export default Banner