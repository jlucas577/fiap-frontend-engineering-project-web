import { useCallback, useEffect, useState } from 'react'
import { CompletionCard } from './components/CompletionCard'
import { ErrorState } from './components/ErrorState'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { LoadingState } from './components/LoadingState'
import { NavigationControls } from './components/NavigationControls'
import { ProgressIndicator } from './components/ProgressIndicator'
import { VocabularyCard } from './components/VocabularyCard'
import { useVocabularySession } from './hooks/use-vocabulary-session'
import { FavoritesPage } from './pages/FavoritesPage'

function App() {
  const session = useVocabularySession()
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname)
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigate = useCallback((path: string) => {
    if (window.location.pathname !== path) window.history.pushState({}, '', path)
    setCurrentPath(path)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <Header currentPath={currentPath} onNavigate={navigate} />
      {currentPath === '/favorites' ? (
        <FavoritesPage
          favorites={session.favoriteWords}
          onRemove={session.removeFavorite}
          onStudy={() => navigate('/')}
        />
      ) : (
        <main className="flex flex-1 items-center px-5 py-10 sm:px-8 sm:py-14">
          <div className="mx-auto w-full max-w-2xl">
            {!session.isLoading && !session.error && !session.isComplete && session.currentWord && (
              <ProgressIndicator current={session.currentIndex + 1} total={session.totalWords} />
            )}

            {session.isLoading && <LoadingState />}
            {!session.isLoading && session.error && <ErrorState message={session.error} onRetry={session.retry} />}
            {!session.isLoading && !session.error && session.isComplete && <CompletionCard />}
            {!session.isLoading && !session.error && !session.isComplete && session.currentWord && (
              <>
                <VocabularyCard vocabulary={session.currentWord} />
                <NavigationControls
                  canGoBack={session.canGoBack}
                  isFavorite={session.isFavorite}
                  disabled={session.isLoading}
                  onBack={session.goBack}
                  onFavorite={session.toggleFavorite}
                  onForward={session.goForward}
                />
              </>
            )}
          </div>
        </main>
      )}
      <Footer />
    </div>
  )
}

export default App
