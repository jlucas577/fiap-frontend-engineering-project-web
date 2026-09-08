import { MessageCircleMore, Quote } from 'lucide-react'
import type { VocabularyWord } from '../types/vocabulary'

interface VocabularyCardProps {
  vocabulary: VocabularyWord
}

export function VocabularyCard({ vocabulary }: VocabularyCardProps) {
  return (
    <article className="relative min-h-[360px] overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white p-7 shadow-xl shadow-slate-200/50 sm:min-h-[400px] sm:p-11">
      <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-blue-50" aria-hidden="true" />
      <div className="relative flex h-full flex-col">
        <h1 className="break-words text-4xl font-bold tracking-[-0.04em] text-slate-950 sm:text-6xl">
          {vocabulary.word}
        </h1>

        <div className="my-8 h-px bg-slate-100" />

        <section className="mb-7">
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-500">
            <Quote className="h-4 w-4 text-blue-500" aria-hidden="true" />
            Exemplo de uso
          </div>
          <p className="text-lg italic leading-relaxed text-slate-700 sm:text-xl">“{vocabulary.useCase}”</p>
        </section>

        <section>
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-500">
            <MessageCircleMore className="h-4 w-4 text-blue-500" aria-hidden="true" />
            Significado
          </div>
          <p className="text-base leading-relaxed text-slate-700 sm:text-lg">{vocabulary.description}</p>
        </section>
      </div>
    </article>
  )
}
