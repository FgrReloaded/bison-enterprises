"use client"
import { Button } from "@/components/ui/button";
import { Cart } from "./_components/Cart";
import ContactForm from "@/components/forms/ContactForm";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clearCart, removeFromCart } from "@/actions/cart";
import { toast } from "sonner";
import { RootState } from "@/lib/store";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { setCart } from "@/lib/slices/cartSlice";
import { useMemo, useState } from "react";


export default function CheckOut() {
    const dispatch = useDispatch();
    const data = useSelector((state: RootState) => state.cart)
    const queryClient = useQueryClient();
    const router = useRouter();
    const userData = useSelector((state: RootState) => state.userProfile);
    const [isValid, setIsValid] = useState<boolean>(false);


    const totalPrice = useMemo(() => {
        return data?.items.reduce((acc, item) => {
            const matchingVariant = item.product.variants.find((variant: any) =>
                Object.keys(item.variant || {}).every(key =>
                    variant.variant[key] && variant.variant[key].includes(item?.variant?.[key])
                )
            );
            const price = matchingVariant ? (matchingVariant as any)?.details.price : item.product.price;
            return acc + price * item.quantity;
        }, 0)
    }, [data?.items])

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

    const { mutate: emptyCart } = useMutation({
        mutationFn: clearCart,
        onSuccess: () => {
            queryClient.setQueryData(['cart'], (oldCart: any) => { });

            queryClient.invalidateQueries({
                queryKey: ['cart']
            });
        },
        onError: (error: any) => {
            console.error(error);
            toast.error('Failed to empty cart');
        }
    })

    const handleDelete = (id: string) => {
        mutate({ cartItemId: id })
    }



    const makePayment = async () => {
        // setLoading(true)
        const res = await initializeRazorpay();

        if (!res) {
            alert("Razorpay SDK Failed to load");
            return;
        }
        const orderRes = await fetch(`/api/order/create?user=${userData?.id}`);
        let result = await orderRes.json();
        // setLoading(false)
        var options = {
            key: process.env.RAZORPAY_ID,
            name: userData?.name,
            currency: result.order.currency,
            amount: result.order.amount,
            order_id: result.order.id,
            description: "Payment For Online Store",
            image: "",
            handler: async function (response: any) {
                const orderData = {
                    amount: result.order.amount / 100,
                    phone: userData?.phone,
                    address: userData?.address,
                    name: userData?.name,
                    email: userData?.email,
                    customerId: userData?.id,
                    items: data?.items,
                    orderCreationId: result.order.id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                };
                // setLoading(true)
                const res = await fetch('/api/order/verify', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(orderData)
                })
                const r = await res.json()
                // setLoading(false)
                if (r.success) {
                    emptyCart();
                    // setShowConfetti(true);
                    router.push("/orders")
                }
            },
            prefill: {
                name: userData?.name,
                email: userData?.email,
                contact: userData?.phone,
            },
        };
        // @ts-ignore 
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    };

    const initializeRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";

            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    };


    return (
        <>

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
                            <ContactForm setIsValid={setIsValid} />
                        </div>
                        <div
                            className=" col-span-12 xl:col-span-4 bg-gray-50 w-full max-xl:px-6 max-w-3xl xl:max-w-lg mx-auto lg:pl-8 py-24">
                            <h2 className="font-manrope font-bold text-3xl leading-10 text-black">
                                Order Summary</h2>
                            <p className="pb-6 border-b border-gray-300">
                                Fill the contact details below
                            </p>
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
                                    <Button disabled={!isValid} onClick={makePayment} className="w-full py-6 text-lg">Checkout</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
