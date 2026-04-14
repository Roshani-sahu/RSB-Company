import { forwardRef } from 'react'
import { cn } from '../../utils/cn'
import Icon from './Icon'

const Input = forwardRef(function Input(
  { className, iconName, suffix, containerClassName, ...props },
  ref,
) {
  return (
    <div className={cn('relative', containerClassName)}>
      {iconName ? (
        <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-text-muted">
          <Icon name={iconName} className="h-4 w-4" />
        </div>
      ) : null}
      <input
        ref={ref}
        className={cn(
          'h-10 w-full rounded-xl border border-border/30 bg-surface/80 px-3 text-sm text-text-primary placeholder:text-text-muted transition-all duration-200 focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/20',
          iconName && 'pl-10',
          suffix && 'pr-12',
          className,
        )}
        {...props}
      />
      {suffix ? (
        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-text-muted">
          {suffix}
        </div>
      ) : null}
    </div>
  )
})

export default Input
