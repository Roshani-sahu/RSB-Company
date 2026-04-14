import { cn } from '../../utils/cn'

const variants = {
  primary:
    'bg-accent text-white border-transparent shadow-[0_0_20px_rgba(96,47,247,0.24)] hover:bg-accent/90 hover:shadow-[0_0_24px_rgba(96,47,247,0.3)]',
  secondary: 'bg-surface text-text-primary border-border/35 hover:bg-surface/80',
  ghost: 'bg-transparent text-text-secondary border-transparent hover:bg-surface/70 hover:text-text-primary',
  danger: 'bg-red-500 text-white border-transparent hover:bg-red-500/90',
}

const sizes = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-10 px-4 text-sm',
  lg: 'h-11 px-5 text-sm',
  icon: 'h-10 w-10 p-0',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className,
  leftIcon,
  rightIcon,
  children,
  type = 'button',
  ...props
}) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl border font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 disabled:pointer-events-none disabled:opacity-50',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  )
}
