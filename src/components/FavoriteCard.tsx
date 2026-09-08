import { HeartOff, MessageCircleMore, Quote } from 'lucide-react'
import type { VocabularyWord } from '../types/vocabulary'

interface FavoriteCardProps {
  vocabulary: VocabularyWord
  onRemove: () => void
}

export function FavoriteCard({ vocabulary, onRemove }: FavoriteCardProps) {
  return (
    <article className="group rounded-3xl border border-slate-200/80 bg-white p-6 shadow-lg shadow-slate-200/40 transition hover:-translate-y-0.5 hover:shadow-xl sm:p-8">
      <div className="flex items-start gap-4">
        <div className="min-w-0 flex-1">
          <h2 className="break-words text-3xl font-bold tracking-[-0.035em] text-slate-950 sm:text-4xl">
            {vocabulary.word}
          </h2>
        </div>
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remover ${vocabulary.word} dos favoritos`}
          title="Remover dos favoritos"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-100 active:scale-95"
        >
          <HeartOff className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <div className="my-6 h-px bg-slate-100" />

      <section className="mb-5">
        <div className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-slate-500">
          <Quote className="h-4 w-4 text-blue-500" aria-hidden="true" />
          Exemplo de uso
        </div>
        <p className="text-base italic leading-relaxed text-slate-700">“{vocabulary.useCase}”</p>
      </section>

      <section>
        <div className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-slate-500">
          <MessageCircleMore className="h-4 w-4 text-blue-500" aria-hidden="true" />
          Significado
        </div>
        <p className="leading-relaxed text-slate-700">{vocabulary.description}</p>
      </section>
    </article>
  )
}
