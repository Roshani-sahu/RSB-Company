import { cn } from '../../utils/cn'

const buildLinePath = (points) =>
  points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ')

const buildAreaPath = (points, baselineY) => {
  if (points.length === 0) {
    return ''
  }

  const linePath = buildLinePath(points)
  const firstPoint = points[0]
  const lastPoint = points[points.length - 1]
  return `${linePath} L ${lastPoint.x} ${baselineY} L ${firstPoint.x} ${baselineY} Z`
}

function LineChart({ labels = [], series = [] }) {
  const width = 760
  const height = 320
  const paddingX = 38
  const paddingTop = 20
  const paddingBottom = 44
  const chartHeight = height - paddingTop - paddingBottom
  const chartWidth = width - paddingX * 2

  const allValues = series.flatMap((entry) => entry.values || [])
  const maxValue = Math.max(...allValues, 1)
  const gridLines = 4

  const getX = (index) => {
    if (labels.length <= 1) {
      return paddingX
    }

    return paddingX + (index / (labels.length - 1)) * chartWidth
  }

  const getY = (value) => paddingTop + chartHeight - (value / maxValue) * chartHeight

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-full w-full">
      {Array.from({ length: gridLines + 1 }).map((_, index) => {
        const y = paddingTop + (index / gridLines) * chartHeight
        return (
          <line
            key={`line-grid-${index}`}
            x1={paddingX}
            y1={y}
            x2={width - paddingX}
            y2={y}
            stroke="rgb(var(--border) / 0.18)"
            strokeWidth="1"
          />
        )
      })}

      {series.map((entry) => {
        const points = entry.values.map((value, index) => ({ x: getX(index), y: getY(value) }))
        const linePath = buildLinePath(points)

        return (
          <g key={entry.id}>
            {entry.fill ? <path d={buildAreaPath(points, height - paddingBottom)} fill={entry.fill} /> : null}
            <path
              d={linePath}
              fill="none"
              stroke={entry.color}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={entry.dashed ? '6 6' : undefined}
            />
          </g>
        )
      })}

      {labels.map((label, index) => (
        <text
          key={`label-${label}-${index}`}
          x={getX(index)}
          y={height - 14}
          textAnchor="middle"
          fill="rgb(var(--text-muted))"
          fontSize="11"
        >
          {label}
        </text>
      ))}
    </svg>
  )
}

function DonutChart({ segments = [], centerLabel = '' }) {
  const size = 220
  const strokeWidth = 26
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const total = segments.reduce((sum, segment) => sum + segment.value, 0) || 1

  let offset = 0

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full">
      <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgb(var(--border) / 0.18)"
          strokeWidth={strokeWidth}
        />
        {segments.map((segment) => {
          const percentage = segment.value / total
          const length = circumference * percentage
          const circle = (
            <circle
              key={segment.label}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={segment.color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={`${length} ${circumference - length}`}
              strokeDashoffset={-offset}
            />
          )

          offset += length
          return circle
        })}
      </g>
      <text
        x={size / 2}
        y={size / 2 - 4}
        textAnchor="middle"
        fill="rgb(var(--text-primary))"
        fontSize="32"
        fontWeight="700"
      >
        {centerLabel}
      </text>
      <text
        x={size / 2}
        y={size / 2 + 18}
        textAnchor="middle"
        fill="rgb(var(--text-muted))"
        fontSize="11"
      >
        Utilization
      </text>
    </svg>
  )
}

export default function Chart({ type = 'line', className, ...props }) {
  return (
    <div className={cn('w-full', type === 'line' ? 'h-[320px]' : 'h-[240px]', className)}>
      {type === 'donut' ? <DonutChart {...props} /> : <LineChart {...props} />}
    </div>
  )
}
