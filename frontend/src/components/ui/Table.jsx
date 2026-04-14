import { cn } from '../../utils/cn'
import EmptyState from './EmptyState'
import { Skeleton } from './Skeleton'

export default function Table({
  columns = [],
  rows = [],
  loading = false,
  rowKey = 'id',
  onRowClick,
  emptyTitle = 'No data available',
  emptyDescription = 'There is nothing to display for this selection.',
  className,
}) {
  const isClickable = typeof onRowClick === 'function'

  return (
    <div className={cn('overflow-x-auto', className)}>
      <table className="min-w-full border-separate border-spacing-0 text-left text-sm">
        <thead>
          <tr className="text-xs uppercase tracking-wider text-text-muted">
            {columns.map((column) => (
              <th
                key={column.key}
                className={cn(
                  'border-b border-border/20 pb-3 pr-4 font-semibold',
                  column.align === 'right' && 'text-right',
                )}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading
            ? Array.from({ length: 4 }).map((_, rowIndex) => (
                <tr key={`table-skeleton-${rowIndex}`}>
                  {columns.map((column) => (
                    <td key={`${column.key}-skeleton-${rowIndex}`} className="border-b border-border/10 py-3 pr-4">
                      <Skeleton className="h-5 w-full max-w-[140px]" />
                    </td>
                  ))}
                </tr>
              ))
            : null}

          {!loading && rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="py-8">
                <EmptyState
                  icon="info"
                  title={emptyTitle}
                  description={emptyDescription}
                />
              </td>
            </tr>
          ) : null}

          {!loading
            ? rows.map((row, rowIndex) => (
                <tr
                  key={row[rowKey] ?? `${rowIndex}`}
                  onClick={isClickable ? () => onRowClick(row) : undefined}
                  className={cn(
                    'group border-b border-border/10 transition-colors',
                    isClickable
                      ? 'cursor-pointer hover:bg-surface/55'
                      : 'hover:bg-surface/40',
                  )}
                >
                  {columns.map((column) => (
                    <td
                      key={`${column.key}-${row[rowKey] ?? rowIndex}`}
                      className={cn(
                        'py-3 pr-4 text-text-secondary group-hover:text-text-primary',
                        column.align === 'right' && 'text-right',
                      )}
                    >
                      {column.render ? column.render(row) : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </div>
  )
}
