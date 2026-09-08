import { BookOpen, Heart } from 'lucide-react'

interface HeaderProps {
  currentPath: string
  onNavigate: (path: string) => void
}

export function Header({ currentPath, onNavigate }: HeaderProps) {
  return (
    <header className="w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-6xl items-center px-5 sm:px-8">
        <a
          href="/"
          onClick={(event) => {
            event.preventDefault()
            onNavigate('/')
          }}
          className="flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-200">
            <BookOpen className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="text-lg font-bold tracking-tight text-slate-950">
            FIAP <span className="text-blue-600">Vocabulary</span>
          </span>
        </a>
        <nav className="ml-auto" aria-label="Navegação principal">
          <a
            href="/favorites"
            aria-label="Favoritos"
            aria-current={currentPath === '/favorites' ? 'page' : undefined}
            onClick={(event) => {
              event.preventDefault()
              onNavigate('/favorites')
            }}
            className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200 sm:px-4 ${
              currentPath === '/favorites'
                ? 'bg-blue-50 text-blue-700'
                : 'text-slate-600 hover:bg-slate-100 hover:text-blue-600'
            }`}
          >
            <Heart className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline" aria-hidden="true">Favoritos</span>
          </a>
        </nav>
      </div>
    </header>
  )
}
