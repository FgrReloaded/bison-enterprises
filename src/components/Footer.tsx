import { Facebook, Instagram, Twitter } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-white" >
            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="lg:flex lg:items-start lg:gap-8">
                    <div className="text-teal-600">
                        <Image src="/logo.png" width={100} height={100} alt='logo' />
                    </div>

                    <div className="mt-8 grid grid-cols-2 gap-8 lg:mt-0 lg:grid-cols-5 lg:gap-y-16">
                        <div className="col-span-2">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Get the latest product alerts!</h2>

                                <p className="mt-4 text-gray-500">
                                    Subscribe to our newsletter to get the latest updates on our products and services.
                                </p>
                            </div>
                        </div>

                        <div className="col-span-2 lg:col-span-3 lg:flex lg:items-end">
                            <form className="w-full">
                                <label htmlFor="UserEmail" className="sr-only"> Email </label>
                                <div
                                    className="border border-gray-100 p-2 focus-within:ring sm:flex sm:items-center sm:gap-4"
                                >
                                    <input
                                        type="email"
                                        id="UserEmail"
                                        placeholder="yourmail@gmail.com"
                                        className="w-full border-none focus:border-transparent focus:ring-transparent sm:text-sm"
                                    />

                                    <button
                                        className="mt-1 w-full bg-teal-500 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-none hover:bg-teal-600 sm:mt-0 sm:w-auto sm:shrink-0"
                                    >
                                        Subscribe
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className="col-span-2 sm:col-span-1 mx-auto text-center">
                            <p className="font-medium text-gray-900">Navigation</p>

                            <ul className="mt-6 space-y-4 text-sm">
                                <li>
                                    <a href="#" className="text-gray-700 transition hover:opacity-75"> Home </a>
                                </li>

                                <li>
                                    <a href="#" className="text-gray-700 transition hover:opacity-75"> Products </a>
                                </li>

                                <li>
                                    <a href="#" className="text-gray-700 transition hover:opacity-75"> Orders </a>
                                </li>

                                <li>
                                    <a href="#" className="text-gray-700 transition hover:opacity-75"> Account </a>
                                </li>
                            </ul>
                        </div>

                        <div className="col-span-2 sm:col-span-1 mx-auto text-center">
                            <p className="font-medium text-gray-900">Store</p>

                            <ul className="mt-6 space-y-4 text-sm">
                                <li>
                                    <a href="#" className="text-gray-700 transition hover:opacity-75"> About </a>
                                </li>

                                <li>
                                    <a href="#" className="text-gray-700 transition hover:opacity-75"> Meet the Team </a>
                                </li>
                            </ul>
                        </div>

                        <div className="col-span-2 sm:col-span-1 mx-auto text-center">
                            <p className="font-medium text-gray-900">Helpful Links</p>

                            <ul className="mt-6 space-y-4 text-sm">
                                <li>
                                    <a href="#" className="text-gray-700 transition hover:opacity-75"> Contact </a>
                                </li>

                                <li>
                                    <a href="#" className="text-gray-700 transition hover:opacity-75"> FAQs </a>
                                </li>
                            </ul>
                        </div>

                        <div className="col-span-2 sm:col-span-1 mx-auto text-center">
                            <p className="font-medium text-gray-900">Legal</p>

                            <ul className="mt-6 space-y-4 text-sm">
                                <li>
                                    <a href="#" className="text-gray-700 transition hover:opacity-75"> Returns Policy </a>
                                </li>

                                <li>
                                    <a href="#" className="text-gray-700 transition hover:opacity-75"> Refund Policy </a>
                                </li>

                            </ul>
                        </div>
                        <ul className="col-span-2 flex justify-start gap-6 lg:col-span-5 lg:justify-end mx-auto">
                            <li>
                                <a
                                    href="#"
                                    rel="noreferrer"
                                    target="_blank"
                                    className="text-gray-700 transition hover:opacity-75"
                                >
                                    <span className="sr-only">Facebook</span>

                                    <Facebook size={20} />
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#"
                                    rel="noreferrer"
                                    target="_blank"
                                    className="text-gray-700 transition hover:opacity-75"
                                >
                                    <span className="sr-only">Instagram</span>

                                    <Instagram size={20} />
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#"
                                    rel="noreferrer"
                                    target="_blank"
                                    className="text-gray-700 transition hover:opacity-75"
                                >
                                    <span className="sr-only">Twitter</span>

                                    <Twitter size={20} />
                                </a>
                            </li>

                        </ul>
                    </div>
                </div>

                <div className="mt-8 border-t border-gray-100 pt-8 text-center">
                    <div className="sm:flex sm:justify-between">
                        <p className="text-xs text-gray-500">&copy; 2024. Online Store. All rights reserved.</p>

                        <ul className="mt-8 flex flex-wrap justify-center gap-4 text-xs sm:mt-0 lg:justify-end">
                            <li>
                                <a href="#" className="text-gray-500 transition hover:opacity-75"> Terms & Conditions </a>
                            </li>

                            <li>
                                <a href="#" className="text-gray-500 transition hover:opacity-75"> Privacy Policy </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer