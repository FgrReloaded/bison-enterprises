import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { ProductCard } from "./ProductCard"


const ProductCarousel = () => {
    return (
        <Carousel opts={{
            align: "start",
            loop: true,
        }} className="w-full" >
            <CarouselContent>
                <CarouselItem className="md:basis-1/2 lg:basis-[24%]"> 
                {/* // For responsive design change basis */}
                    <ProductCard />
                </CarouselItem>
                <CarouselItem className="md:basis-1/2 lg:basis-[24%]">
                    <ProductCard />
                </CarouselItem>
                <CarouselItem className="md:basis-1/2 lg:basis-[24%]">
                    <ProductCard />
                </CarouselItem>
                <CarouselItem className="md:basis-1/2 lg:basis-[24%]">
                    <ProductCard />
                </CarouselItem>
                <CarouselItem className="md:basis-1/2 lg:basis-[24%]">
                    <ProductCard />
                </CarouselItem>
                <CarouselItem className="md:basis-1/2 lg:basis-[24%]">
                    <ProductCard />
                </CarouselItem>
                <CarouselItem className="md:basis-1/2 lg:basis-[24%]">
                    <ProductCard />
                </CarouselItem>
                <CarouselItem className="md:basis-1/2 lg:basis-[24%]">
                    <ProductCard />
                </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}

export default ProductCarousel