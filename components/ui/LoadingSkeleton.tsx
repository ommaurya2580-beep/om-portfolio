export default function LoadingSkeleton({ className = '' }: { className?: string }) {
    return (
        <div className={`animate-pulse bg-white/5 border border-white/5 ${className}`} />
    );
}

export function ProjectCardSkeleton() {
    return (
        <div className="glass rounded-2xl border border-white/5 overflow-hidden h-[400px]">
            <LoadingSkeleton className="h-40 w-full" />
            <div className="p-6">
                <LoadingSkeleton className="h-6 w-3/4 mb-4 rounded" />
                <LoadingSkeleton className="h-4 w-full mb-2 rounded" />
                <LoadingSkeleton className="h-4 w-5/6 mb-4 rounded" />
                <div className="flex gap-2 mb-4">
                    <LoadingSkeleton className="h-6 w-16 rounded" />
                    <LoadingSkeleton className="h-6 w-16 rounded" />
                    <LoadingSkeleton className="h-6 w-16 rounded" />
                </div>
            </div>
        </div>
    );
}

export function AppCardSkeleton() {
    return (
        <div className="glass rounded-2xl border border-white/5 p-6 flex items-start gap-4 h-[160px]">
            <LoadingSkeleton className="w-16 h-16 rounded-xl flex-shrink-0" />
            <div className="flex-1 space-y-2">
                <LoadingSkeleton className="h-6 w-3/4 rounded" />
                <LoadingSkeleton className="h-4 w-1/2 rounded" />
                <LoadingSkeleton className="h-8 w-24 rounded mt-2" />
            </div>
        </div>
    );
}
