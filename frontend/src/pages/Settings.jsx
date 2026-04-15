import { useState } from "react"
import GlassCard from "../components/ui/GlassCard"
import Button from "../components/ui/Button"
import Icon from "../components/ui/Icon"

export default function Settings() {
  const [activeTab, setActiveTab] = useState("users")

  const users = [
    {
      name: "Alex Morgan",
      email: "alex.m@globalcorp.com",
      role: "Super Admin",
      status: "Active",
      lastLogin: "Just now",
    },
    {
      name: "Sarah Jenkins",
      email: "s.jenkins@globalcorp.com",
      role: "Warehouse Manager",
      status: "Active",
      lastLogin: "2 hours ago",
    },
    {
      name: "Mike Taylor",
      email: "m.taylor@globalcorp.com",
      role: "Inventory Clerk",
      status: "Pending",
      lastLogin: "Never",
    },
  ]

  return (
    <div className="flex gap-8 p-6">

      {/* 🔥 LEFT SIDEBAR */}
      <div className="w-64 hidden md:block">
        <div className="space-y-6 sticky top-0">

          <SidebarSection title="General">
            <SidebarItem icon="building" label="Organization" />
            <SidebarItem icon="file" label="Tax Configuration" />
            <SidebarItem icon="scale" label="UOM Settings" />
          </SidebarSection>

          <SidebarSection title="Access">
            <SidebarItem
              icon="users"
              label="Users & Access"
              active
              onClick={() => setActiveTab("users")}
            />
            <SidebarItem icon="shield" label="Roles" />
            <SidebarItem icon="list" label="Audit Logs" />
          </SidebarSection>

          <SidebarSection title="Developers">
            <SidebarItem icon="key" label="API Keys" />
            <SidebarItem icon="link" label="Webhooks" />
          </SidebarSection>
        </div>
      </div>

      {/* 🔥 RIGHT CONTENT */}
      <div className="flex-1 space-y-6">

        {/* HEADER */}
        <div>
          <h1 className="text-2xl font-bold text-text-primary">
            Users & Access
          </h1>
          <p className="text-sm text-text-muted">
            Manage team members and permissions
          </p>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-4">
          <StatCard title="Active Users" value="24 / 50" icon="users" />
          <StatCard title="Roles" value="5" icon="shield" />
          <StatCard title="Invites" value="3" icon="mail" />
        </div>

        {/* TABLE */}
        <GlassCard className="overflow-hidden">

          {/* TOOLBAR */}
          <div className="p-4 border-b border-border flex justify-between">
            <input
              placeholder="Search users..."
              className="px-3 py-2 rounded-lg bg-surface border border-border text-sm"
            />

            <Button>
              <Icon name="userPlus" className="mr-2" />
              Invite User
            </Button>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-text-muted border-b border-border">
                <tr>
                  <th className="p-4 text-left">User</th>
                  <th className="p-4 text-left">Role</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-left">Last Login</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user, i) => (
                  <tr
                    key={i}
                    className="border-b border-border hover:bg-surface/50"
                  >
                    <td className="p-4">
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-xs text-text-muted">
                          {user.email}
                        </p>
                      </div>
                    </td>

                    <td className="p-4">{user.role}</td>

                    <td className="p-4">
                      <span className="text-xs px-2 py-1 rounded bg-accent/10 text-accent">
                        {user.status}
                      </span>
                    </td>

                    <td className="p-4 text-text-muted">
                      {user.lastLogin}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>

        {/* API CARD */}
        <GlassCard className="p-6">
          <h3 className="text-lg font-semibold mb-2">
            API Authentication
          </h3>
          <p className="text-sm text-text-muted mb-4">
            Manage API keys securely
          </p>

          <div className="flex justify-between items-center bg-surface p-4 rounded-xl border border-border">
            <div>
              <p className="font-medium">Production ERP Sync</p>
              <p className="text-xs text-text-muted">
                sk_live_***********
              </p>
            </div>

            <Button variant="danger">Revoke</Button>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}

/* 🔥 COMPONENTS */

function SidebarSection({ title, children }) {
  return (
    <div>
      <h4 className="text-xs text-text-muted mb-2 px-2 uppercase">
        {title}
      </h4>
      <div className="space-y-1">{children}</div>
    </div>
  )
}

function SidebarItem({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm transition ${
        active
          ? "bg-surface text-text-primary border-l-2 border-accent"
          : "text-text-muted hover:text-text-primary"
      }`}
    >
      <Icon name={icon} />
      {label}
    </button>
  )
}

function StatCard({ title, value, icon }) {
  return (
    <GlassCard className="p-4">
      <div className="flex justify-between mb-3">
        <Icon name={icon} />
      </div>
      <h3 className="text-xl font-bold">{value}</h3>
      <p className="text-xs text-text-muted">{title}</p>
    </GlassCard>
  )
}