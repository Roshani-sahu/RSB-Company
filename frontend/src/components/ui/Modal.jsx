import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '../../utils/cn'
import Icon from './Icon'

export default function Modal({ open, onClose, title, description, children, className }) {
  useEffect(() => {
    if (!open) {
      return undefined
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose?.()
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [open, onClose])

  if (!open || typeof document === 'undefined') {
    return null
  }

  return createPortal(
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6">
      <div
        className="absolute inset-0 bg-black/55 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          'gradient-border relative z-10 w-full max-w-2xl overflow-hidden p-6 shadow-[0_32px_80px_-40px_rgba(0,0,0,0.6)]',
          className,
        )}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
            {description ? <p className="mt-1 text-sm text-text-secondary">{description}</p> : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-text-muted transition-colors hover:bg-surface hover:text-text-primary"
            aria-label="Close"
          >
            <Icon name="close" className="h-4 w-4" />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>,
    document.body,
  )
}
