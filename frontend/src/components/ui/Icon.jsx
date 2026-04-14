import { cn } from '../../utils/cn'

const icons = {
  menu: (
    <>
      <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" strokeLinecap="round" />
    </>
  ),
  plus: (
    <>
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </>
  ),
  bell: (
    <>
      <path d="M15 17H9a2 2 0 0 1-2-2v-3.4c0-1.5-.6-3-1.8-4a6.8 6.8 0 0 1 13.6 0c-1.2 1-1.8 2.5-1.8 4V15a2 2 0 0 1-2 2Z" />
      <path d="M10 17a2 2 0 0 0 4 0" strokeLinecap="round" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path
        d="M12 2v2.2M12 19.8V22M4.9 4.9l1.5 1.5M17.6 17.6l1.5 1.5M2 12h2.2M19.8 12H22M4.9 19.1l1.5-1.5M17.6 6.4l1.5-1.5"
        strokeLinecap="round"
      />
    </>
  ),
  moon: (
    <>
      <path d="M20.5 14.3A8.5 8.5 0 1 1 9.7 3.5a7 7 0 0 0 10.8 10.8Z" />
    </>
  ),
  chevronDown: (
    <>
      <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  chevronRight: (
    <>
      <path d="m10 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  download: (
    <>
      <path d="M12 4v10" strokeLinecap="round" />
      <path d="m8.5 10.5 3.5 3.5 3.5-3.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 18h14" strokeLinecap="round" />
    </>
  ),
  warning: (
    <>
      <path d="M12 4 3.2 19h17.6L12 4Z" strokeLinejoin="round" />
      <path d="M12 9v4.5M12 16h.01" strokeLinecap="round" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 10.5v5M12 8h.01" strokeLinecap="round" />
    </>
  ),
  arrowUp: (
    <>
      <path d="m7 14 5-5 5 5" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  minus: (
    <>
      <path d="M6 12h12" strokeLinecap="round" />
    </>
  ),
  dollar: (
    <>
      <path d="M12 4v16M15.5 8.5c0-1.4-1.4-2.5-3.5-2.5S8.5 7 8.5 8.5 9.9 11 12 11s3.5 1.1 3.5 2.5S14.1 16 12 16s-3.5-1.1-3.5-2.5" />
    </>
  ),
  box: (
    <>
      <path d="m4 8 8-4 8 4-8 4-8-4Z" strokeLinejoin="round" />
      <path d="M4 8v8l8 4 8-4V8M12 12v8" strokeLinejoin="round" />
    </>
  ),
  cart: (
    <>
      <path d="M4 5h2l2 9h9l2-6H7" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="10" cy="18.5" r="1.5" />
      <circle cx="17" cy="18.5" r="1.5" />
    </>
  ),
  file: (
    <>
      <path d="M7 3.8h7l3.2 3.2V20H7z" strokeLinejoin="round" />
      <path d="M14 3.8V7h3.2M9.2 11.2h5.6M9.2 14.2h5.6" strokeLinecap="round" />
    </>
  ),
  swap: (
    <>
      <path d="M4 8h12l-3-3M20 16H8l3 3" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  scan: (
    <>
      <path d="M4 8V5a1 1 0 0 1 1-1h3M20 8V5a1 1 0 0 0-1-1h-3M4 16v3a1 1 0 0 0 1 1h3M20 16v3a1 1 0 0 1-1 1h-3M8 12h8" strokeLinecap="round" />
    </>
  ),
  check: (
    <>
      <path d="m5 12 4 4 10-10" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  close: (
    <>
      <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
    </>
  ),
  dashboard: (
    <>
      <rect x="4" y="4" width="7" height="7" rx="1.6" />
      <rect x="13" y="4" width="7" height="11" rx="1.6" />
      <rect x="4" y="13" width="7" height="7" rx="1.6" />
      <rect x="13" y="17" width="7" height="3" rx="1.6" />
    </>
  ),
  inventory: (
    <>
      <path d="m4 8 8-4 8 4-8 4-8-4Z" strokeLinejoin="round" />
      <path d="M4 8v8l8 4 8-4V8" strokeLinejoin="round" />
    </>
  ),
  alerts: (
    <>
      <path d="M15 17H9a2 2 0 0 1-2-2v-3.4c0-1.5-.6-3-1.8-4a6.8 6.8 0 0 1 13.6 0c-1.2 1-1.8 2.5-1.8 4V15a2 2 0 0 1-2 2Z" />
      <circle cx="18" cy="6" r="2.1" />
    </>
  ),
  reports: (
    <>
      <path d="M5 19h14" strokeLinecap="round" />
      <rect x="6" y="11" width="3" height="6" rx="1" />
      <rect x="10.5" y="8" width="3" height="9" rx="1" />
      <rect x="15" y="6" width="3" height="11" rx="1" />
    </>
  ),
  settings: (
    <>
      <path d="m12 3 2 1 2.2-.2 1.3 1.7 2 .8v2l1.3 1.7-1.3 1.7v2l-2 .8-1.3 1.7-2.2-.2-2 1-2-1-2.2.2-1.3-1.7-2-.8v-2L3.5 12l1.3-1.7v-2l2-.8L8.1 5.8l2.2.2 1.7-1Z" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="2.8" />
    </>
  ),
  calendar: (
    <>
      <rect x="4" y="6" width="16" height="14" rx="2" />
      <path d="M8 3.5v5M16 3.5v5M4 10h16" strokeLinecap="round" />
    </>
  ),
  dots: (
    <>
      <circle cx="6.5" cy="12" r="1.2" />
      <circle cx="12" cy="12" r="1.2" />
      <circle cx="17.5" cy="12" r="1.2" />
    </>
  ),
  filter: (
    <>
      <path d="M4 6h16M7 12h10M10 18h4" strokeLinecap="round" />
    </>
  ),
  warehouse: (
    <>
      <path d="M4 10.8 12 5l8 5.8V20H4z" strokeLinejoin="round" />
      <path d="M9 20v-5h6v5M8.5 12.5h.01M12 12.5h.01M15.5 12.5h.01" strokeLinecap="round" />
    </>
  ),
}

export default function Icon({ name, className, strokeWidth = 1.8 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={cn('h-5 w-5', className)}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      aria-hidden="true"
    >
      {icons[name] ?? icons.info}
    </svg>
  )
}
