import { CreditCard, ShieldCheck, Store, TicketPercent, Truck } from 'lucide-react'
import React from 'react'

const FeatureCard = () => {
    return (
        <div className='grid grid-cols-5 gap-8 pt-4 pb-8 px-8 bg-[#F7F7F8]'>
            <div className='flex justify-center items-center gap-4 bg-white p-4 rounded-xl'>
                <div className='w-12 h-12 content-center'>
                    <TicketPercent size={28} />
                </div>
                <h4 className='text-sm'>Log in get up to 50% discounts</h4>
            </div>
            <div className='flex justify-center items-center gap-4 bg-white p-4 rounded-xl'>
                <div className='w-12 h-12 content-center'>
                    <Store size={28} />
                </div>
                <h4 className='text-sm'>Open new stores in your city</h4>
            </div>
            <div className='flex justify-center items-center gap-4 bg-white p-4 rounded-xl'>
                <div className='w-12 h-12 content-center'>
                    <Truck size={28} />
                </div>
                <h4 className='text-sm'>Free fast express delivery with tracking</h4>
            </div>
            <div className='flex justify-center items-center gap-4 bg-white p-4 rounded-xl'>
                <div className='w-12 h-12 content-center'>
                    <ShieldCheck size={28} />
                </div>
                <h4 className='text-sm'>Equipment loose and damage insurance</h4>
            </div>
            <div className='flex justify-center items-center gap-4 bg-white p-4 rounded-xl'>
                <div className='w-12 h-12 content-center'>
                    <CreditCard size={28} />
                </div>
                <h4 className='text-sm'>Installment without overpayments</h4>
            </div>
        </div>
    )
}

export default FeatureCard