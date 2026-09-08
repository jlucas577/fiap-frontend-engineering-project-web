import type { BffErrorResponse, VocabularyWord } from '../types/vocabulary'

const REQUEST_TIMEOUT_MS = 15_000
const EXPECTED_WORDS = 5
const FALLBACK_ERROR = 'Não foi possível carregar as palavras. Tente novamente.'

export class VocabularyServiceError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
    public readonly code?: string,
  ) {
    super(message)
    this.name = 'VocabularyServiceError'
  }
}

function isVocabularyWord(value: unknown): value is VocabularyWord {
  if (!value || typeof value !== 'object') return false

  const word = value as Record<string, unknown>
  return (
    typeof word.word === 'string' &&
    word.word.trim().length > 0 &&
    typeof word.description === 'string' &&
    word.description.trim().length > 0 &&
    typeof word.useCase === 'string' &&
    word.useCase.trim().length > 0
  )
}

function normalizeBaseUrl(value: string | undefined) {
  const baseUrl = value?.trim().replace(/\/+$/, '')
  if (!baseUrl) {
    throw new VocabularyServiceError(
      'A URL do serviço de vocabulário não foi configurada.',
      undefined,
      'CONFIGURATION_ERROR',
    )
  }
  return baseUrl
}

function messageForStatus(status: number, apiMessage?: string) {
  if (status === 429) return 'Muitas solicitações foram feitas. Aguarde alguns minutos e tente novamente.'
  if (status === 502) return 'O serviço de geração está temporariamente indisponível.'
  if (status >= 500) return 'O serviço está temporariamente indisponível. Tente novamente em instantes.'
  return apiMessage || FALLBACK_ERROR
}

export async function fetchVocabularySession(): Promise<VocabularyWord[]> {
  const baseUrl = normalizeBaseUrl(import.meta.env.VITE_BFF_BASE_URL)
  const controller = new AbortController()
  const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  try {
    const response = await fetch(`${baseUrl}/ask`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    })

    let data: unknown
    try {
      data = await response.json()
    } catch {
      throw new VocabularyServiceError(FALLBACK_ERROR, response.status, 'INVALID_JSON_RESPONSE')
    }

    if (!response.ok) {
      const error = data as BffErrorResponse
      throw new VocabularyServiceError(
        messageForStatus(response.status, error.error?.message),
        response.status,
        error.error?.code,
      )
    }

    if (!Array.isArray(data) || data.length !== EXPECTED_WORDS || !data.every(isVocabularyWord)) {
      throw new VocabularyServiceError(
        'O serviço retornou palavras em um formato inesperado.',
        response.status,
        'INVALID_WORDS_CONTRACT',
      )
    }

    const normalizedWords = data.map((item) => ({
      word: item.word.trim(),
      description: item.description.trim(),
      useCase: item.useCase.trim(),
    }))
    const uniqueWords = new Set(normalizedWords.map(({ word }) => word.toLocaleLowerCase()))

    if (uniqueWords.size !== EXPECTED_WORDS) {
      throw new VocabularyServiceError(
        'O serviço retornou palavras repetidas.',
        response.status,
        'INVALID_WORDS_CONTRACT',
      )
    }

    return normalizedWords
  } catch (error) {
    if (error instanceof VocabularyServiceError) throw error
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new VocabularyServiceError('A solicitação demorou mais que o esperado. Tente novamente.')
    }
    throw new VocabularyServiceError(FALLBACK_ERROR)
  } finally {
    window.clearTimeout(timeoutId)
  }
}
