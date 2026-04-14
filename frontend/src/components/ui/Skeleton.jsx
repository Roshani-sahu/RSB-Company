import { cn } from '../../utils/cn'

export function Skeleton({ className }) {
  return <div className={cn('animate-pulse rounded-lg bg-surface', className)} />
}

export function SkeletonRows({ rows = 3 }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: rows }).map((_, index) => (
        <Skeleton key={`skeleton-${index}`} className="h-10 w-full" />
      ))}
    </div>
  )
}
