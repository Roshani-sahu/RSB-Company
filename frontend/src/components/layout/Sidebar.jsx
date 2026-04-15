import { NavLink } from 'react-router-dom'
import { cn } from '../../utils/cn'
import Badge from '../ui/Badge'
import Icon from '../ui/Icon'

const navigationItems = [
  { to: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
  { to: '/inventory', label: 'Inventory', icon: 'inventory' },
  { to: '/warehouses', label: 'Warehouses', icon: 'warehouse' },
  { to: '/product-detail', label: 'Product Detail', icon: 'product' },
  { to: '/alerts', label: 'Alerts', icon: 'alerts', badge: '3' },
  { to: '/purchase-orders', label: 'Purchase Orders', icon: 'orders' },
  { to: '/reports', label: 'Reports', icon: 'reports' },
]

export default function Sidebar({ isOpen, onClose, isCollapsed, onToggleCollapse }) {
  const linkBaseClasses =
    'group flex items-center justify-between rounded-xl border px-3 py-2.5 text-sm font-medium transition-all duration-200'

  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-40 w-64 border-r border-border/15 bg-panel/95 backdrop-blur-xl transition-[transform,width] duration-300 lg:translate-x-0',
        isCollapsed ? 'lg:w-20' : 'lg:w-64',
        isOpen ? 'translate-x-0' : '-translate-x-full',
      )}
    >
      <div
        className={cn(
          'flex h-16 items-center justify-between border-b border-border/15 px-5',
          isCollapsed && 'lg:px-3',
        )}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent/75 text-white shadow-[0_0_20px_rgba(96,47,247,0.4)]">
            <Icon name="box" className="h-4 w-4" />
          </div>
          <span
            className={cn(
              'text-base font-bold tracking-tight text-text-primary transition-all duration-200',
              isCollapsed && 'lg:w-0 lg:overflow-hidden lg:opacity-0',
            )}
          >
            NexStock
          </span>
        </div>
        <div className="flex items-center">
          <button
            type="button"
            onClick={onToggleCollapse}
            className="hidden rounded-lg p-2 text-text-muted transition-colors hover:bg-surface hover:text-text-primary lg:inline-flex"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <Icon
              name="chevronRight"
              className={cn('h-4 w-4 transition-transform duration-200', !isCollapsed && 'rotate-180')}
            />
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-text-muted transition-colors hover:bg-surface hover:text-text-primary lg:hidden"
            aria-label="Close sidebar"
          >
            <Icon name="close" className="h-4 w-4" />
          </button>
        </div>
      </div>

      <nav
        className={cn(
          'flex h-[calc(100%-4rem)] flex-col justify-between overflow-y-auto px-4 py-6',
          isCollapsed && 'lg:px-2.5',
        )}
      >
        <div className="space-y-1">
          {navigationItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              title={item.label}
              className={({ isActive }) =>
                cn(
                  linkBaseClasses,
                  isCollapsed && 'lg:justify-center lg:px-2',
                  isActive
                    ? 'border-border/30 bg-surface/95 text-accent shadow-soft'
                    : 'border-transparent text-text-secondary hover:border-border/20 hover:bg-surface/70 hover:text-text-primary',
                )
              }
            >
              <span className={cn('flex items-center gap-3', isCollapsed && 'lg:gap-0')}>
                <Icon name={item.icon} className="h-[18px] w-[18px]" />
                <span
                  className={cn(
                    'transition-all duration-200',
                    isCollapsed && 'lg:w-0 lg:overflow-hidden lg:opacity-0',
                  )}
                >
                  {item.label}
                </span>
              </span>
              {item.badge ? (
                <Badge variant="danger" className={cn(isCollapsed && 'lg:hidden')}>
                  {item.badge}
                </Badge>
              ) : null}
            </NavLink>
          ))}
        </div>

        <div className="space-y-1 border-t border-border/15 pt-4">
          <NavLink
            to="/settings"
            onClick={onClose}
            title="Settings"
            className={({ isActive }) =>
              cn(
                'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 hover:bg-surface/70 hover:text-text-primary',
                isCollapsed && 'lg:justify-center lg:px-2',
                isActive ? 'text-accent' : 'text-text-secondary',
              )
            }
          >
            <Icon name="settings" className="h-[18px] w-[18px]" />
            <span
              className={cn(
                'transition-all duration-200',
                isCollapsed && 'lg:w-0 lg:overflow-hidden lg:opacity-0',
              )}
            >
              Settings
            </span>
          </NavLink>
          <button
            type="button"
            title="Billing"
            className={cn(
              'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-text-secondary transition-all duration-200 hover:bg-surface/70 hover:text-text-primary',
              isCollapsed && 'lg:justify-center lg:px-2',
            )}
          >
            <Icon name="file" className="h-[18px] w-[18px]" />
            <span
              className={cn(
                'transition-all duration-200',
                isCollapsed && 'lg:w-0 lg:overflow-hidden lg:opacity-0',
              )}
            >
              Billing
            </span>
          </button>
        </div>
      </nav>
    </aside>
  )
}
