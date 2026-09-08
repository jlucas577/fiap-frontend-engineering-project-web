import { RefreshCw, TriangleAlert } from 'lucide-react'

interface ErrorStateProps {
  message: string
  onRetry: () => void
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <section className="flex min-h-[430px] flex-col items-center justify-center rounded-[2rem] border border-red-100 bg-white px-7 py-12 text-center shadow-xl shadow-slate-200/50" role="alert">
      <span className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-600">
        <TriangleAlert className="h-8 w-8" aria-hidden="true" />
      </span>
      <h1 className="text-2xl font-bold tracking-tight text-slate-950">Não foi possível carregar sua sessão</h1>
      <p className="mt-3 max-w-md leading-relaxed text-slate-600">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-7 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200 active:scale-[0.98]"
      >
        <RefreshCw className="h-4 w-4" aria-hidden="true" />
        Tentar novamente
      </button>
    </section>
  )
}
