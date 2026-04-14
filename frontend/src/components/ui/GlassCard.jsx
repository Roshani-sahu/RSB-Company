import Card from './Card'
import { cn } from '../../utils/cn'

export default function GlassCard({ className, children, ...props }) {
  return (
    <Card
      className={cn(
        'glass-panel transition-all duration-300 hover:border-border/25 hover:shadow-glow',
        className,
      )}
      {...props}
    >
      {children}
    </Card>
  )
}
