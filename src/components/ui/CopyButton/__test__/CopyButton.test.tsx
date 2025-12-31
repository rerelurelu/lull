import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, test, vi } from 'vitest'
import { CopyButton } from '../CopyButton'

describe('CopyButton', () => {
  const setupClipboard = (mockImplementation = vi.fn().mockResolvedValue(undefined)) => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: mockImplementation },
      writable: true,
      configurable: true,
    })
    return mockImplementation
  }

  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('初期状態でコピーアイコンが表示される', () => {
    render(<CopyButton code='const x = 1' />)
    const copyIcon = screen.getByTitle('コピー')
    expect(copyIcon).toBeInTheDocument()
  })

  test('クリック時にクリップボードにコピーされる', async () => {
    const user = userEvent.setup()
    const writeTextMock = setupClipboard()

    render(<CopyButton code='const x = 1' />)
    const button = screen.getByRole('button', { name: 'コードをコピー' })

    await user.click(button)

    expect(writeTextMock).toHaveBeenCalledWith('const x = 1')
  })

  test('コピー成功後にチェックマークアイコンが表示される', async () => {
    const user = userEvent.setup()
    setupClipboard()

    render(<CopyButton code='const x = 1' />)
    const button = screen.getByRole('button', { name: 'コードをコピー' })

    await user.click(button)

    await waitFor(() => {
      const checkIcon = screen.getByTitle('コピー完了')
      expect(checkIcon).toBeInTheDocument()
    })
  })

  test('2秒後にコピーアイコンに戻る', async () => {
    const user = userEvent.setup()
    setupClipboard()

    render(<CopyButton code='const x = 1' />)
    const button = screen.getByRole('button', { name: 'コードをコピー' })

    await user.click(button)

    await waitFor(() => {
      expect(screen.getByTitle('コピー完了')).toBeInTheDocument()
    })

    await waitFor(
      () => {
        expect(screen.getByTitle('コピー')).toBeInTheDocument()
      },
      { timeout: 3000 },
    )
  })

  test('コピー失敗時にエラーログが出力される', async () => {
    const user = userEvent.setup()
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    setupClipboard(vi.fn().mockRejectedValue(new Error('Permission denied')))

    render(<CopyButton code='const x = 1' />)
    const button = screen.getByRole('button', { name: 'コードをコピー' })

    await user.click(button)

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Failed to copy to clipboard:',
        expect.any(Error),
      )
    })

    consoleErrorSpy.mockRestore()
  })
})
