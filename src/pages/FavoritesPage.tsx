import { Heart } from 'lucide-react'
import { FavoriteCard } from '../components/FavoriteCard'
import { FavoritesEmptyState } from '../components/FavoritesEmptyState'
import type { VocabularyWord } from '../types/vocabulary'

interface FavoriteEntry {
  word: VocabularyWord
  key: string
}

interface FavoritesPageProps {
  favorites: FavoriteEntry[]
  onRemove: (key: string) => void
  onStudy: () => void
}

export function FavoritesPage({ favorites, onRemove, onStudy }: FavoritesPageProps) {
  return (
    <main className="flex-1 px-5 py-10 sm:px-8 sm:py-14">
      <div className="mx-auto w-full max-w-3xl">
        <header className="mb-8">
          <div className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
            <Heart className="h-4 w-4 fill-current" aria-hidden="true" />
            Sua coleção
          </div>
          <h1 className="text-4xl font-bold tracking-[-0.04em] text-slate-950 sm:text-5xl">Palavras favoritas</h1>
          <p className="mt-3 max-w-xl leading-relaxed text-slate-600">
            Revise as palavras que mais chamaram sua atenção durante os estudos.
          </p>
        </header>

        {favorites.length === 0 ? (
          <FavoritesEmptyState onStudy={onStudy} />
        ) : (
          <div className="space-y-5" aria-live="polite">
            {favorites.map(({ word, key }) => (
              <FavoriteCard key={key} vocabulary={word} onRemove={() => onRemove(key)} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
