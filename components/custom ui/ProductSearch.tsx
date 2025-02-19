'use client'
import React, { useState } from 'react'
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Loader, RefreshCw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import DropDown from './DropDown';
import toast from 'react-hot-toast';


const ProductSearch = ({ item }: { item: string }) => {
    const router = useRouter();
    const [query, setQuery] = useState('');
    const [load, setLoad] = useState(false);

    const itemName = item === 'products' ? 'products' : item === 'orders' ? 'orders' : 'customers'

    const fields = {
        'products': ['title', 'category', '_id'],
        'orders': ['customerEmail', 'status', '_id', 'createdAt'],
        'customers': ['email', '_id', 'name'],
    }
    const values: string[] = fields[itemName]
    const [key, setKey] = useState(values[0]);

    const handleSearch = () => {
        if (query) {
            router.push(`/${itemName}?key=${key}&query=${query}`);
        } else router.push(`/${itemName}`);
    };
    const handleRefresh = () => {
        router.refresh();
        toast.success('Refreshed');
    }
    return (
        <form action={handleSearch} className="flex items-center flex-col sm:flex-row gap-3">
            <Input
                placeholder={`Search by ${key}...`}
                onChange={(e) => setQuery(e.target.value)}
                className="max-w-sm"
                minLength={key === '_id' ? 24 : 3}
            />
            <Button type='button' onClick={handleRefresh}>
                {load ? <Loader className='animate-spin' /> : <RefreshCw />}
            </Button>
            <DropDown currentValue={key} setSearchValue={setKey} values={values}></DropDown>
        </form>
    )
}

export default ProductSearch
