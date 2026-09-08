import { useCallback, useEffect, useRef, useState } from 'react'
import { fetchVocabularySession } from '../services/vocabulary-service'
import type { VocabularyWord } from '../types/vocabulary'

const FAVORITES_STORAGE_KEY = 'fiap-vocabulary:favorites'

function wordKey(word: VocabularyWord) {
  return word.word.trim().toLocaleLowerCase()
}

function isStoredWord(value: unknown): value is VocabularyWord {
  if (!value || typeof value !== 'object') return false
  const item = value as Record<string, unknown>
  return ['word', 'description', 'useCase'].every(
    (field) => typeof item[field] === 'string' && item[field].trim().length > 0,
  )
}

function loadStoredFavorites() {
  try {
    const stored = JSON.parse(localStorage.getItem(FAVORITES_STORAGE_KEY) || '[]') as unknown
    if (!Array.isArray(stored)) return new Map<string, VocabularyWord>()

    return new Map(
      stored
        .filter(isStoredWord)
        .map((word) => [wordKey(word), word] as const),
    )
  } catch {
    return new Map<string, VocabularyWord>()
  }
}

export function useVocabularySession() {
  const [words, setWords] = useState<VocabularyWord[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [favorites, setFavorites] = useState<Map<string, VocabularyWord>>(loadStoredFavorites)
  const [isLoading, setIsLoading] = useState(true)
  const [isComplete, setIsComplete] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const requestInProgress = useRef(false)

  const loadSession = useCallback(async () => {
    if (requestInProgress.current) return

    requestInProgress.current = true
    setIsLoading(true)
    setError(null)

    try {
      const sessionWords = await fetchVocabularySession()
      setWords(sessionWords)
      setCurrentIndex(0)
      setIsComplete(false)
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Não foi possível carregar as palavras.')
    } finally {
      requestInProgress.current = false
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    // Loading remote data on mount is the external synchronization performed by this effect.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadSession()
  }, [loadSession])

  useEffect(() => {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify([...favorites.values()]))
  }, [favorites])

  const goBack = useCallback(() => {
    setCurrentIndex((index) => Math.max(0, index - 1))
  }, [])

  const goForward = useCallback(() => {
    if (isLoading || isComplete || words.length === 0) return
    if (currentIndex === words.length - 1) {
      setIsComplete(true)
      return
    }
    setCurrentIndex((index) => index + 1)
  }, [currentIndex, isComplete, isLoading, words.length])

  const toggleFavorite = useCallback(() => {
    const currentWord = words[currentIndex]
    if (!currentWord) return

    setFavorites((current) => {
      const next = new Map(current)
      const key = wordKey(currentWord)
      if (next.has(key)) next.delete(key)
      else next.set(key, currentWord)
      return next
    })
  }, [currentIndex, words])

  const removeFavorite = useCallback((key: string) => {
    setFavorites((current) => {
      const next = new Map(current)
      next.delete(key)
      return next
    })
  }, [])

  const favoriteWords = [...favorites.entries()].map(([key, word]) => ({ key, word }))
  const currentWord = words[currentIndex]

  return {
    currentWord,
    currentIndex,
    totalWords: words.length || 5,
    isFavorite: currentWord ? favorites.has(wordKey(currentWord)) : false,
    favoriteWords,
    isLoading,
    isComplete,
    error,
    canGoBack: currentIndex > 0,
    goBack,
    goForward,
    toggleFavorite,
    removeFavorite,
    retry: loadSession,
  }
}
