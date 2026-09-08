import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import App from './App'

const words = Array.from({ length: 5 }, (_, index) => ({
  word: `word-${index + 1}`,
  description: `Descrição ${index + 1}`,
  useCase: `Example ${index + 1}`,
}))

function mockSuccessfulRequest() {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => words,
    }),
  )
}

describe('FIAP Vocabulary', () => {
  afterEach(() => {
    cleanup()
    vi.unstubAllGlobals()
    localStorage.clear()
    window.history.replaceState({}, '', '/')
  })

  it('navigates through five words, preserves favorites and completes the session', async () => {
    mockSuccessfulRequest()
    const user = userEvent.setup()
    render(<App />)

    expect(await screen.findByRole('heading', { name: 'word-1' })).toBeInTheDocument()
    expect(screen.getByLabelText('Voltar')).toBeDisabled()

    await user.click(screen.getByLabelText('Favoritar'))
    expect(screen.getByLabelText('Remover dos favoritos')).toHaveAttribute('aria-pressed', 'true')

    for (let index = 2; index <= 5; index += 1) {
      await user.click(screen.getByLabelText('Avançar'))
      expect(screen.getByRole('heading', { name: `word-${index}` })).toBeInTheDocument()
    }

    for (let index = 0; index < 4; index += 1) await user.click(screen.getByLabelText('Voltar'))
    expect(screen.getByLabelText('Remover dos favoritos')).toHaveAttribute('aria-pressed', 'true')

    for (let index = 0; index < 5; index += 1) await user.click(screen.getByLabelText('Avançar'))

    expect(screen.getByRole('heading', { name: 'Isso é tudo por agora!' })).toBeInTheDocument()
    expect(fetch).toHaveBeenCalledTimes(1)
  })

  it('offers a retry after an API failure', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({
        ok: false,
        status: 502,
        json: async () => ({ error: { code: 'GROQ_REQUEST_ERROR', message: 'Falha no Groq.' } }),
      })
      .mockResolvedValueOnce({ ok: true, status: 200, json: async () => words })
    vi.stubGlobal('fetch', fetchMock)

    const user = userEvent.setup()
    render(<App />)

    expect(await screen.findByText('O serviço de geração está temporariamente indisponível.')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Tentar novamente' }))
    expect(await screen.findByRole('heading', { name: 'word-1' })).toBeInTheDocument()
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })

  it('lists and removes favorites while keeping the study page in sync', async () => {
    mockSuccessfulRequest()
    const user = userEvent.setup()
    render(<App />)

    expect(await screen.findByRole('heading', { name: 'word-1' })).toBeInTheDocument()
    await user.click(screen.getByLabelText('Favoritar'))
    await user.click(screen.getByRole('link', { name: 'Favoritos' }))

    expect(screen.getByRole('heading', { name: 'Palavras favoritas' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'word-1' })).toBeInTheDocument()
    expect(screen.getByText('Example 1', { exact: false })).toBeInTheDocument()
    expect(screen.getByText('Descrição 1')).toBeInTheDocument()

    await user.click(screen.getByLabelText('Remover word-1 dos favoritos'))
    expect(screen.getByText('Você ainda não possui palavras favoritas.')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Voltar aos estudos' }))
    expect(screen.getByLabelText('Favoritar')).not.toHaveAttribute('aria-pressed', 'true')
  })

  it('restores favorite words after the application is reopened', async () => {
    mockSuccessfulRequest()
    const user = userEvent.setup()
    const firstRender = render(<App />)

    expect(await screen.findByRole('heading', { name: 'word-1' })).toBeInTheDocument()
    await user.click(screen.getByLabelText('Favoritar'))
    firstRender.unmount()

    render(<App />)
    expect(await screen.findByRole('heading', { name: 'word-1' })).toBeInTheDocument()
    await user.click(screen.getByRole('link', { name: 'Favoritos' }))

    expect(screen.getByRole('heading', { name: 'word-1' })).toBeInTheDocument()
    expect(screen.getByText('Descrição 1')).toBeInTheDocument()
  })
})
