export function LoadingState() {
  return (
    <div className="min-h-[430px] rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-xl shadow-slate-200/50" role="status" aria-live="polite">
      <div className="flex h-full min-h-[360px] flex-col justify-center">
        <div className="mb-8 h-3 w-28 animate-pulse rounded-full bg-blue-100" />
        <div className="mb-10 h-14 w-3/4 animate-pulse rounded-2xl bg-slate-200" />
        <div className="mb-4 h-4 w-full animate-pulse rounded-full bg-slate-100" />
        <div className="mb-10 h-4 w-4/5 animate-pulse rounded-full bg-slate-100" />
        <div className="mb-4 h-4 w-full animate-pulse rounded-full bg-slate-100" />
        <div className="h-4 w-2/3 animate-pulse rounded-full bg-slate-100" />
        <span className="sr-only">Carregando sua sessão de palavras…</span>
      </div>
    </div>
  )
}
