'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function RedirectPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter();
    const { id } = React.use(params);

    useEffect(() => {
        const fetchUrl = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/redirect`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ "shortId": id }),
                });
                const data = await response.json();
                console.log(data);
                if (!response.ok) {
                    throw new Error('URL not found');
                }
                window.location.href = data.originalUrl;
            } catch (error) {
                router.push('/');
            }
        };

        fetchUrl();
    }, [id, router]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center">
                <h2 className="text-2xl font-semibold text-gray-900">Redirecting...</h2>
                <p className="mt-2 text-gray-600">Please wait while we redirect you.</p>
            </div>
        </div>
    );
} 