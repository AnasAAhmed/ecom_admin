'use client'
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const InternetStatus: React.FC = () => {
    const [isOnline, setIsOnline] = useState(true);

    useEffect(() => {
        const updateOnlineStatus = () => {
            setIsOnline(navigator.onLine);
        };

        updateOnlineStatus();

        window.addEventListener('online', updateOnlineStatus);
        window.addEventListener('offline', updateOnlineStatus);

        return () => {
            window.removeEventListener('online', updateOnlineStatus);
            window.removeEventListener('offline', updateOnlineStatus);
            console.log(isOnline ? 'online' : 'offline');

        };
    }, []);

    useEffect(() => {
        if (isOnline) {
            toast((t) => (
                <span>
                    Your are Online.
                    <button className='bg-black text-white hover:opacity-45 py-1 px-2 mx-3 rounded-md' onClick={() => toast.dismiss(t.id)}>
                        Dismiss
                    </button>
                </span>
            ));
        } else {
            toast((t) => (
                <span>
                    You are offline. Please check your internet connection.
                    <button className='bg-black text-white hover:opacity-45 py-1 px-2 mx-3 rounded-md' onClick={() => toast.dismiss(t.id)}>
                        Dismiss
                    </button>
                </span>
            ));
        }
    }, [isOnline]);

    return null;
};

export default InternetStatus;
