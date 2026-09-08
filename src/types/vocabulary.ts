export interface VocabularyWord {
  word: string
  description: string
  useCase: string
}

export interface BffErrorResponse {
  error?: {
    code?: string
    message?: string
  }
}
