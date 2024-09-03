import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import crypto from "crypto";
import { db } from "@/lib/db";


export async function POST(req: Request) {
    const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_ID as string,
        key_secret: process.env.RAZORPAY_SECRET,
    });
    const {
        orderCreationId,
        razorpayPaymentId,
        razorpaySignature,
        amount,
        customerId,
        items
    } = await req.json();

    try {

        const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET as string);

        shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

        const digest = shasum.digest("hex");

        if (digest !== razorpaySignature)
            return NextResponse.json({ msg: "Transaction not legit!" }, {
                status: 400
            })
        const data = await razorpay.payments.fetch(razorpayPaymentId);
      
        const orderState = data.status;
        if (orderState === "captured" || orderState === "authorized") {
            await db.order.create({
                data:{
                    total: amount,
                    customerId,
                    status: data.status === "captured" ?"PROCESSING":"PENDING",
                    items,
                    paymentInfo: data as any
                }
            })
           
        }
        return NextResponse.json({ success: true, msg: "Order Placed Successfully" }, {
            status: 200
        })
    } catch (error: any) {
        return NextResponse.json({ success: false, msg: "Internal Server Error", e: error.message }, {
            status: 500
        })
    }

}