import { cn } from '../../utils/cn'

export default function Card({ className, children, ...props }) {
  return (
    <div className={cn('rounded-2xl border border-border/20 bg-panel shadow-soft', className)} {...props}>
      {children}
    </div>
  )
}
