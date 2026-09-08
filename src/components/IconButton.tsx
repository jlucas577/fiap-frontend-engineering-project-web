import type { LucideIcon } from 'lucide-react'

interface IconButtonProps {
  label: string
  icon: LucideIcon
  onClick: () => void
  disabled?: boolean
  active?: boolean
}

export function IconButton({ label, icon: Icon, onClick, disabled = false, active = false }: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={active || undefined}
      title={label}
      disabled={disabled}
      onClick={onClick}
      className={`group flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-35 sm:h-14 sm:w-14 ${
        active
          ? 'border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-200'
          : 'border-slate-200 bg-white text-slate-600 shadow-sm hover:-translate-y-0.5 hover:border-blue-300 hover:text-blue-600 hover:shadow-md active:translate-y-0'
      }`}
    >
      <Icon className={`h-5 w-5 transition-transform ${active ? 'fill-current' : 'group-hover:scale-110'}`} />
    </button>
  )
}
