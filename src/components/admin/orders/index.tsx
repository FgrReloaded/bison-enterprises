"use client"

import { getCustomerDetails } from '@/actions/admin/user'
import { OrderData } from '@/lib/types'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { OrderCart } from './OrderCart'

const OrderDetails = ({ order }: { order: OrderData | null }) => {
    const { data: customerDetails } = useQuery({
        queryKey: ['customer-details'],
        queryFn: () => getCustomerDetails(order?.customerId!),
        // initialData: {}
    })
    return (
        <div className="py-8 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto h-[80vh]">
            <div className="flex justify-start item-start space-y-2 flex-col">
                <h1 className="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">Order Id: {order?.id}  ({order?.status})</h1>
                <p className="text-base dark:text-gray-300 font-medium leading-6 text-gray-600">{order?.createdAt ? new Date(order.createdAt).toString() : ''}</p>
            </div>
            <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                    <div className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                        <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">Ordered Products</p>
                        <OrderCart data={order} />
                    </div>
                    <div className="flex justify-center flex-col md:flex-row items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                        <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                            <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Summary</h3>
                            <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                                <div className="flex justify-between w-full">
                                    <p className="text-base dark:text-white leading-4 text-gray-800">Subtotal:</p>
                                    <p className="text-base dark:text-gray-300 leading-4 text-gray-600">₹ {(order?.total!) - 50 } with (18% GST)</p>
                                </div>
                                <div className="flex justify-between items-center w-full">
                                    <p className="text-base dark:text-white leading-4 text-gray-800">Shipping</p>
                                    <p className="text-base dark:text-gray-300 leading-4 text-gray-600">₹ 50.00</p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center w-full">
                                <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">Total</p>
                                <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">₹ {order?.total}</p>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    customerDetails &&
                    <div className="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
                        <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Customer</h3>
                        <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
                            <div className="flex flex-col justify-start items-start flex-shrink-0">
                                <div className="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                                    <img src="https://i.ibb.co/5TSg7f6/Rectangle-18.png" alt="avatar" />
                                    <div className="flex justify-start items-start flex-col space-y-2">
                                        {customerDetails && 'name' in customerDetails && (
                                            <p className="text-base dark:text-white font-semibold leading-4 text-left text-gray-800">{customerDetails.name}</p>
                                        )}
                                        <p className="text-sm dark:text-gray-300 leading-5 text-gray-600">10 Previous Orders</p>
                                    </div>
                                </div>

                                <div className="flex justify-center text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M3 7L12 13L21 7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    {customerDetails && 'email' in customerDetails && (
                                        <p className="cursor-pointer text-sm leading-5 ">{customerDetails.email}</p>
                                    )}
                                </div>
                            </div>
                            <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
                                <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                                    <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                                        <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">Shipping Address</p>
                                        {
                                            customerDetails && 'address' in customerDetails &&
                                            <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">{customerDetails?.address},  {customerDetails?.city}, {customerDetails?.state}, {customerDetails?.pincode}</p>
                                        }
                                    </div>
                                    <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4">
                                        <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">Billing Address</p>
                                        <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">180 North King Street, Northhampton MA 1060</p>
                                    </div>
                                </div>
                                <div className="flex w-full justify-center items-center md:justify-start md:items-start">
                                    <button className="mt-6 md:mt-0 dark:border-white dark:hover:bg-gray-900 dark:bg-transparent dark:text-white py-5 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium w-96 2xl:w-full text-base leading-4 text-gray-800">Edit Details</button>
                                </div>
                            </div>
                        </div>
                    </div>
                }

            </div>
        </div>
    )
}

export default OrderDetails