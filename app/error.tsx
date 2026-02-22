'use client';

import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] bg-[#020209] text-white p-6 rounded-2xl border border-white/5 mx-auto max-w-2xl my-10">
            <div className="text-[#ff0080] text-4xl mb-4">⚠️</div>
            <h2 className="text-xl font-bold mb-2 text-white">Something went wrong!</h2>
            <p className="text-slate-400 mb-6 text-center">
                We encountered an unexpected error.
            </p>
            <button
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
                className="px-6 py-2 bg-[#00f5ff]/10 border border-[#00f5ff]/50 text-[#00f5ff] rounded-full hover:bg-[#00f5ff]/20 transition-all font-mono text-sm"
            >
                Try again
            </button>
        </div>
    );
}
