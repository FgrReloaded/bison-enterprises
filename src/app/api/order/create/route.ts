import { getCart } from "@/actions/cart";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { v4 as uuid } from "uuid";

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_ID as string,
    key_secret: process.env.RAZORPAY_SECRET,
});

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const cart = await getCart();

    // calculate total amount
    const totalPrice = cart?.items.reduce((acc, item) => {
        const matchingVariant = item.product.variants.find((variant: any) =>
            Object.keys(item.variant || {}).every(key =>
                // @ts-ignore
                variant.variant[key] && variant.variant[key].includes(item?.variant?.[key])
            )
        );
        const price = matchingVariant ? (matchingVariant as any)?.details.price : item.product.price;
        return acc + price * item.quantity;
    }, 0)

    const gst = totalPrice! * 0.18;
    const totalAmount = totalPrice! + gst + 50;

    const amount = totalAmount! * 100;
    const options = {
        amount: amount.toString(),
        currency: "INR",
        receipt: uuid(),
    };

    const order = await instance.orders.create(options);
    return NextResponse.json({ message: "success", order });
}