import { ArrowLeft, ArrowRight, Heart } from 'lucide-react'
import { IconButton } from './IconButton'

interface NavigationControlsProps {
  canGoBack: boolean
  isFavorite: boolean
  disabled: boolean
  onBack: () => void
  onFavorite: () => void
  onForward: () => void
}

export function NavigationControls({
  canGoBack,
  isFavorite,
  disabled,
  onBack,
  onFavorite,
  onForward,
}: NavigationControlsProps) {
  return (
    <nav className="mt-7 flex items-start justify-center gap-8 sm:gap-12" aria-label="Navegação entre palavras">
      <div className="flex flex-col items-center gap-2">
        <IconButton label="Voltar" icon={ArrowLeft} onClick={onBack} disabled={!canGoBack || disabled} />
        <span className="text-xs font-medium text-slate-500">Voltar</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <IconButton
          label={isFavorite ? 'Remover dos favoritos' : 'Favoritar'}
          icon={Heart}
          onClick={onFavorite}
          disabled={disabled}
          active={isFavorite}
        />
        <span className="text-xs font-medium text-slate-500">{isFavorite ? 'Favoritada' : 'Favoritar'}</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <IconButton label="Avançar" icon={ArrowRight} onClick={onForward} disabled={disabled} />
        <span className="text-xs font-medium text-slate-500">Avançar</span>
      </div>
    </nav>
  )
}
