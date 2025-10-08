'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '../lib/auth';

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        if (isAuthenticated()) {
            router.push('/home');
        } else {
            router.push('/signin');
        }
    }, [router]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <p>Redirecting...</p>
        </div>
    );
}
