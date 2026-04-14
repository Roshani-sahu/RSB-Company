export default function AtmosphericBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -right-24 -top-32 h-[540px] w-[540px] rounded-full bg-accent/20 blur-[110px] dark:bg-accent/22" />
      <div className="absolute -bottom-36 -left-20 h-[460px] w-[460px] rounded-full bg-sky/20 blur-[100px] dark:bg-sky/16" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_0%,rgba(96,47,247,0.12)_0%,rgba(96,47,247,0)_48%)] dark:bg-[radial-gradient(circle_at_40%_0%,rgba(96,47,247,0.2)_0%,rgba(96,47,247,0)_48%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:36px_36px] opacity-[0.18] dark:opacity-[0.08]" />
    </div>
  )
}
