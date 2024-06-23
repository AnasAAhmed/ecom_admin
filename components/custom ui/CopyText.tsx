'use client'
import { Clipboard } from 'lucide-react';
import React from 'react'
import toast from 'react-hot-toast';

const CopyText = (text: any) => {
    return (
        <span className="text-base-medium" onClick={() => { navigator.clipboard.writeText(text); toast.success('text copied') }}>
            <Clipboard className="cursor-pointer h-3 w-3 " />{text.toString()}
        </span>
    )
}

export default CopyText
