"use client"
import { getWishlist } from "@/actions/wishlist";
import { ProductCard } from "@/components/products/ProductCard";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";

export default function WishlistPage() {
    const { data: wishlists, isLoading, error } = useQuery({
        queryKey: ['wishlist'],
        queryFn: () => getWishlist(),
        initialData: [],
    });

    if (isLoading) return <div>Loading...</div>;

    if (wishlists?.length === 0) return <div>No wishlist found</div>;
    
    return (
        <>
            <h1 className="text-3xl font-semibold px-4 md:pr-4 md:pl-6 py-2">Wishlist</h1>
            <Separator />
            <div className='px-4 py-6 flex mx-auto justify-center items-center gap-12 flex-wrap w-[90%]'>
                {
                    wishlists?.map((wishlists:any, idx:number) => (
                        <ProductCard isWishlist={true} key={idx} product={wishlists} />
                    ))
                }
            </div>
        </>
    )
}