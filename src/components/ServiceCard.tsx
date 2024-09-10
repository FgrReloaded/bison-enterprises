import { CreditCard, ShieldCheck, Store, TicketPercent, Truck } from 'lucide-react'
import React from 'react'

const FeatureCard = () => {
    return (
        <div className='grid md:grid-cols-4 grid-cols-2 gap-8 pt-4 pb-8 px-8 bg-[#F7F7F8] justify-center place-content-center'>
            <div className='flex justify-center items-center gap-4 bg-white p-4 rounded-xl md:flex-row flex-col'>
                <div className='w-12 h-12 content-center'>
                    <TicketPercent className='mx-auto'  size={28} />
                </div>
                <h4 className='text-base text-center md:text-left'>Log in get up to 50% discounts</h4>
            </div>
            <div className='flex justify-center items-center gap-4 bg-white p-4 rounded-xl md:flex-row flex-col'>
                <div className='w-12 h-12 content-center'>
                    <Truck className='mx-auto'  size={28} />
                </div>
                <h4 className='text-base text-center md:text-left'>Fast express delivery with tracking</h4>
            </div>
            <div className='flex justify-center items-center gap-4 bg-white p-4 rounded-xl md:flex-row flex-col'>
                <div className='w-12 h-12 content-center'>
                    <ShieldCheck  className='mx-auto' size={28} />
                </div>
                <h4 className='text-base text-center md:text-left'>Equipment loose and damage insurance</h4>
            </div>
            <div className='flex justify-center items-center gap-4 bg-white p-4 rounded-xl md:flex-row flex-col'>
                <div className='w-12 h-12 content-center'>
                    <CreditCard  className='mx-auto' size={28} />
                </div>
                <h4 className='text-base text-center md:text-left'>Installment without overpayments</h4>
            </div>
        </div>
    )
}

export default FeatureCard