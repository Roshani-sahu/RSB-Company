import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { cn } from '../../utils/cn'
import AtmosphericBackground from './AtmosphericBackground.jsx'
import Header from './Header.jsx'
import Sidebar from './Sidebar.jsx'

const SIDEBAR_COLLAPSE_KEY = 'rsb-sidebar-collapsed'

const getInitialSidebarCollapsed = () => {
  if (typeof window === 'undefined') {
    return false
  }

  return window.localStorage.getItem(SIDEBAR_COLLAPSE_KEY) === '1'
}

export default function AppLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false)
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(getInitialSidebarCollapsed)
  const location = useLocation()

  useEffect(() => {
    setSidebarOpen(false)
  }, [location.pathname])

  useEffect(() => {
    window.localStorage.setItem(SIDEBAR_COLLAPSE_KEY, isSidebarCollapsed ? '1' : '0')
  }, [isSidebarCollapsed])

  return (
    <div className="relative min-h-screen bg-bg text-text-primary">
      <AtmosphericBackground />

      {isSidebarOpen ? (
        <button
          type="button"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/45 backdrop-blur-sm lg:hidden"
          aria-label="Close sidebar overlay"
        />
      ) : null}

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed((current) => !current)}
      />

      <div
        className={cn(
          'relative flex min-h-screen flex-1 flex-col transition-[padding] duration-300',
          isSidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64',
        )}
      >
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-7xl page-transition">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
