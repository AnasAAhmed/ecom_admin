'use client'
import { ChevronRight } from 'lucide-react';
import React, { useState } from 'react'
import { Button } from '../ui/button';
type DropSearchProps = {
    setSearchValue: any;
    currentValue?: string;
    values: string[]
}
const DropDown = ({ currentValue, setSearchValue, values }: DropSearchProps) => {
    const [open, setOpen] = useState(false);
    return (
        <div className="relative" onBlur={()=>setTimeout(()=>setOpen(false),130)}>
            <button type='button' onClick={() => setOpen(!open)}  className="flex items-center space-x-1 p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:border-blue-400">
                <span>{currentValue ? currentValue : "Filters"}</span>
                <ChevronRight className={`transition-all duration-200 h-5 w-5 ${open && "rotate-90"}`} />
            </button>
            {open && (
                <div className="absolute z-30 left-0 mt-2 w-44 origin-top-right bg-white border border-gray-300 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {values.map((value, index) => (
                        <Button type='button' key={index} onClick={() => setSearchValue(value)} className="block w-full border-b py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">{value}</Button>
                    ))}
                </div>
            )}
        </div>
    )
}

export default DropDown
