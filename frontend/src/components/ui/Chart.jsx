import { useId } from 'react'
import { cn } from '../../utils/cn'

const defaultSeriesColors = [
  'rgb(var(--accent))',
  'rgb(var(--sky))',
  'rgb(16 185 129)',
  'rgb(245 158 11)',
  'rgb(239 68 68)',
]

const normalizeSeries = (series = []) =>
  (series || []).map((entry, index) => ({
    id: entry.id ?? entry.name ?? `series-${index}`,
    name: entry.name ?? `Series ${index + 1}`,
    values: entry.values ?? entry.data ?? [],
    color: entry.color ?? defaultSeriesColors[index % defaultSeriesColors.length],
    fill: entry.fill,
    dashed: entry.dashed,
  }))

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

function LineChart({ labels = [], series = [], animate = true, duration = 900 }) {
  const width = 760
  const height = 320
  const paddingX = 38
  const paddingTop = 20
  const paddingBottom = 44
  const chartHeight = height - paddingTop - paddingBottom
  const chartWidth = width - paddingX * 2

  const normalizedSeries = normalizeSeries(series)
  const allValues = normalizedSeries.flatMap((entry) => entry.values || [])
  const maxValue = Math.max(...allValues, 1)
  const gridLines = 4
  const clipPathId = useId().replace(/:/g, '')

  const getX = (index) => {
    if (labels.length <= 1) {
      return paddingX
    }

    return paddingX + (index / (labels.length - 1)) * chartWidth
  }

  const getY = (value) => paddingTop + chartHeight - (value / maxValue) * chartHeight

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-full w-full">
      <defs>
        <clipPath id={clipPathId}>
          <rect
            x={paddingX}
            y={paddingTop - 2}
            width={animate ? 0 : chartWidth}
            height={chartHeight + paddingBottom + 4}
          >
            {animate ? (
              <animate
                attributeName="width"
                from="0"
                to={chartWidth}
                dur={`${duration}ms`}
                begin="0s"
                fill="freeze"
              />
            ) : null}
          </rect>
        </clipPath>
      </defs>

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

      <g clipPath={`url(#${clipPathId})`}>
        {normalizedSeries.map((entry) => {
          const points = (entry.values || []).map((value, index) => ({ x: getX(index), y: getY(value) }))
          const linePath = buildLinePath(points)

          return (
            <g key={entry.id}>
              {entry.fill ? (
                <path d={buildAreaPath(points, height - paddingBottom)} fill={entry.fill} opacity="0.9" />
              ) : null}
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
      </g>

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

function BarChart({ labels = [], series = [], animate = true, duration = 900 }) {
  const width = 760
  const height = 320
  const paddingX = 38
  const paddingTop = 20
  const paddingBottom = 44
  const chartHeight = height - paddingTop - paddingBottom
  const chartWidth = width - paddingX * 2
  const normalizedSeries = normalizeSeries(series)
  const groupCount = Math.max(labels.length, 1)
  const seriesCount = Math.max(normalizedSeries.length, 1)
  const groupWidth = chartWidth / groupCount
  const barGap = Math.min(8, groupWidth * 0.08)
  const totalBarsWidth = groupWidth * 0.72
  const barWidth = Math.max((totalBarsWidth - barGap * (seriesCount - 1)) / seriesCount, 10)
  const allValues = normalizedSeries.flatMap((entry) => entry.values || [])
  const maxValue = Math.max(...allValues, 1)
  const gridLines = 4

  const getY = (value) => paddingTop + chartHeight - (value / maxValue) * chartHeight

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-full w-full">
      {Array.from({ length: gridLines + 1 }).map((_, index) => {
        const y = paddingTop + (index / gridLines) * chartHeight
        return (
          <line
            key={`bar-grid-${index}`}
            x1={paddingX}
            y1={y}
            x2={width - paddingX}
            y2={y}
            stroke="rgb(var(--border) / 0.18)"
            strokeWidth="1"
          />
        )
      })}

      {labels.map((label, labelIndex) => {
        const groupStartX = paddingX + labelIndex * groupWidth + (groupWidth - totalBarsWidth) / 2

        return (
          <g key={`bar-group-${label}-${labelIndex}`}>
            {normalizedSeries.map((entry, seriesIndex) => {
              const value = entry.values?.[labelIndex] ?? 0
              const targetY = getY(value)
              const targetHeight = Math.max((value / maxValue) * chartHeight, 2)
              const barX = groupStartX + seriesIndex * (barWidth + barGap)
              const fromY = paddingTop + chartHeight

              return (
                <rect
                  key={`${entry.id}-${labelIndex}`}
                  x={barX}
                  y={animate ? fromY : targetY}
                  width={barWidth}
                  height={animate ? 0 : targetHeight}
                  rx="5"
                  fill={entry.color}
                  opacity="0.92"
                >
                  {animate ? (
                    <>
                      <animate
                        attributeName="y"
                        from={fromY}
                        to={targetY}
                        dur={`${duration}ms`}
                        begin={`${labelIndex * 70 + seriesIndex * 40}ms`}
                        fill="freeze"
                      />
                      <animate
                        attributeName="height"
                        from="0"
                        to={targetHeight}
                        dur={`${duration}ms`}
                        begin={`${labelIndex * 70 + seriesIndex * 40}ms`}
                        fill="freeze"
                      />
                    </>
                  ) : null}
                </rect>
              )
            })}

            <text
              x={groupStartX + totalBarsWidth / 2}
              y={height - 14}
              textAnchor="middle"
              fill="rgb(var(--text-muted))"
              fontSize="11"
            >
              {label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

function DonutChart({ segments = [], centerLabel = '', animate = true, duration = 900 }) {
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
        {segments.map((segment, index) => {
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
              strokeDasharray={
                animate ? `0 ${circumference}` : `${length} ${circumference - length}`
              }
              strokeDashoffset={-offset}
            >
              {animate ? (
                <animate
                  attributeName="stroke-dasharray"
                  from={`0 ${circumference}`}
                  to={`${length} ${circumference - length}`}
                  dur={`${Math.max(duration - 200, 300)}ms`}
                  begin={`${index * 120}ms`}
                  fill="freeze"
                />
              ) : null}
            </circle>
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
        opacity={animate ? 0 : 1}
      >
        {centerLabel}
        {animate ? (
          <animate
            attributeName="opacity"
            from="0"
            to="1"
            dur="280ms"
            begin={`${Math.max(duration - 160, 250)}ms`}
            fill="freeze"
          />
        ) : null}
      </text>
      <text
        x={size / 2}
        y={size / 2 + 18}
        textAnchor="middle"
        fill="rgb(var(--text-muted))"
        fontSize="11"
        opacity={animate ? 0 : 1}
      >
        Utilization
        {animate ? (
          <animate
            attributeName="opacity"
            from="0"
            to="1"
            dur="280ms"
            begin={`${Math.max(duration - 120, 300)}ms`}
            fill="freeze"
          />
        ) : null}
      </text>
    </svg>
  )
}

export default function Chart({ type = 'line', className, animate = true, duration = 900, ...props }) {
  const resolvedType = type === 'bar' ? 'bar' : type === 'donut' ? 'donut' : 'line'

  return (
    <div className={cn('w-full', resolvedType === 'donut' ? 'h-[240px]' : 'h-[320px]', className)}>
      {resolvedType === 'donut' ? (
        <DonutChart animate={animate} duration={duration} {...props} />
      ) : resolvedType === 'bar' ? (
        <BarChart animate={animate} duration={duration} {...props} />
      ) : (
        <LineChart animate={animate} duration={duration} {...props} />
      )}
    </div>
  )
}
