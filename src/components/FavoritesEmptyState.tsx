import { Heart } from 'lucide-react'

interface FavoritesEmptyStateProps {
  onStudy: () => void
}

export function FavoritesEmptyState({ onStudy }: FavoritesEmptyStateProps) {
  return (
    <section className="flex min-h-[400px] flex-col items-center justify-center rounded-[2rem] border border-slate-200/80 bg-white px-7 py-12 text-center shadow-xl shadow-slate-200/40">
      <span className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
        <Heart className="h-8 w-8" aria-hidden="true" />
      </span>
      <h2 className="text-2xl font-bold tracking-tight text-slate-950">Você ainda não possui palavras favoritas.</h2>
      <p className="mt-3 max-w-md leading-relaxed text-slate-600">
        Favorite algumas palavras durante seus estudos e elas aparecerão aqui.
      </p>
      <button
        type="button"
        onClick={onStudy}
        className="mt-7 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200 active:scale-[0.98]"
      >
        Voltar aos estudos
      </button>
    </section>
  )
}
