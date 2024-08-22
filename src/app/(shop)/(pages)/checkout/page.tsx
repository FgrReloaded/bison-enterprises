"use client"
import { Button } from "@/components/ui/button";
import { Cart } from "./_components/Cart";
import ContactForm from "@/components/forms/ContactForm";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeFromCart } from "@/actions/cart";
import { toast } from "sonner";
import { RootState } from "@/lib/store";


export default function CheckOut() {
    const dispatch = useDispatch();
    const data = useSelector((state: RootState) => state.cart)
    const queryClient = useQueryClient();


    const totalPrice = data?.items.reduce((acc, item) => {
        const matchingVariant = item.product.variants.find((variant: any) =>
            Object.keys(item.variant || {}).every(key =>
                variant.variant[key] && variant.variant[key].includes(item?.variant?.[key])
            )
        );
        const price = matchingVariant ? (matchingVariant as any)?.details.price : item.product.price;
        return acc + price * item.quantity;
    }, 0)

    const { mutate } = useMutation({
        mutationFn: removeFromCart,
        onSuccess: () => {
            queryClient.setQueryData(['cart'], (oldCart: any) => { });

            queryClient.invalidateQueries({
                queryKey: ['cart']
            });
            toast.success('Cart updated successfully');
        },
        onError: (error: any) => {
            console.error(error);
            toast.error('Failed to update cart');
        }
    })

    const handleDelete = (id: string) => {
        mutate({ cartItemId: id })
    }

    return (
        <section
            className=" relative z-10 after:contents-[''] after:absolute after:z-0 after:h-full xl:after:w-1/3 after:top-0 after:right-0 after:bg-gray-50">
            <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto relative z-10">
                <div className="grid grid-cols-12">
                    <div
                        className="col-span-12 xl:col-span-8 lg:pr-8 pt-14 pb-8 lg:py-24 w-full max-xl:max-w-3xl max-xl:mx-auto">
                        <div className="flex items-center justify-between pb-8 border-b border-gray-300">
                            <h2 className="font-manrope font-bold text-3xl leading-10 text-black">Shopping Cart</h2>
                            <h2 className="font-manrope font-bold text-xl leading-8 text-gray-600">3 Items</h2>
                        </div>
                        <Cart data={data} />
                        <ContactForm />
                    </div>
                    <div
                        className=" col-span-12 xl:col-span-4 bg-gray-50 w-full max-xl:px-6 max-w-3xl xl:max-w-lg mx-auto lg:pl-8 py-24">
                        <h2 className="font-manrope font-bold text-3xl leading-10 text-black pb-8 border-b border-gray-300">
                            Order Summary</h2>
                        <div className="mt-8">
                            <div className="flex items-center justify-between pb-6">
                                <p className="font-normal text-lg leading-8 text-black">Subtotal:</p>
                                <p className="font-medium text-lg leading-8 text-black">₹ {totalPrice}</p>
                            </div>
                            <div className="flex items-center justify-between pb-6">
                                <p className="font-normal text-lg leading-8 text-black">GST:</p>
                                <p className="font-medium text-lg leading-8 text-black">18%</p>
                            </div>
                            <div className="flex items-center justify-between pb-6">
                                <p className="font-normal text-lg leading-8 text-black">Delivery:</p>
                                <p className="font-medium text-lg leading-8 text-black">₹ 50</p>
                            </div>
                            <div>
                                <div className="flex items-center justify-between py-8">
                                    <p className="font-medium text-xl leading-8 text-black">Total:</p>
                                    <p className="font-semibold text-xl leading-8 text-indigo-600">₹ {totalPrice * 0.18 + totalPrice + 50}</p>
                                </div>
                                <Button className="w-full py-6 text-lg">Checkout</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
}
