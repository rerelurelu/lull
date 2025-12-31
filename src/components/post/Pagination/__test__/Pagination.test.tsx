import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { Pagination } from '../Pagination'

const mockPush = vi.fn()
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

describe('Pagination', () => {
  const defaultProps = {
    count: 120,
    pageSize: 12,
    defaultPage: 1,
    baseUrl: 'posts',
    siblingCount: 1,
  }

  beforeEach(() => {
    mockPush.mockClear()
  })

  test('ページ番号がクリック可能', async () => {
    const user = userEvent.setup()
    render(<Pagination {...defaultProps} />)

    const page2Button = screen.getByText('2')
    await user.click(page2Button)

    expect(mockPush).toHaveBeenCalledWith('/posts/2')
  })

  test('次ページボタンで次のページに遷移', async () => {
    const user = userEvent.setup()
    render(<Pagination {...defaultProps} />)

    const nextButton = screen.getByRole('button', { name: /next/i })
    await user.click(nextButton)

    expect(mockPush).toHaveBeenCalledWith('/posts/2')
  })

  test('前ページボタンで前のページに遷移', async () => {
    const user = userEvent.setup()
    render(<Pagination {...defaultProps} defaultPage={3} />)

    const prevButton = screen.getByRole('button', { name: /prev/i })
    await user.click(prevButton)

    expect(mockPush).toHaveBeenCalledWith('/posts/2')
  })

  test('現在のページをクリックしても遷移しない', async () => {
    const user = userEvent.setup()
    render(<Pagination {...defaultProps} />)

    const currentPageButton = screen.getByText('1')
    await user.click(currentPageButton)

    expect(mockPush).not.toHaveBeenCalled()
  })

  test('最初のページで前ページボタンをクリックしても遷移しない', async () => {
    const user = userEvent.setup()
    render(<Pagination {...defaultProps} />)

    const prevButton = screen.getByRole('button', { name: /prev/i })
    await user.click(prevButton)

    expect(mockPush).not.toHaveBeenCalled()
  })

  test('最後のページで次ページボタンをクリックしても遷移しない', async () => {
    const user = userEvent.setup()
    render(<Pagination {...defaultProps} defaultPage={10} />)

    const nextButton = screen.getByRole('button', { name: /next/i })
    await user.click(nextButton)

    expect(mockPush).not.toHaveBeenCalled()
  })

  test('ページ数が多い場合に省略記号が表示される', () => {
    render(<Pagination {...defaultProps} count={240} defaultPage={10} />)

    const ellipsis = screen.getAllByText('…')
    expect(ellipsis.length).toBeGreaterThan(0)
  })

  test('baseUrlが正しく使用される', async () => {
    const user = userEvent.setup()
    render(<Pagination {...defaultProps} baseUrl='articles' />)

    const page2Button = screen.getByText('2')
    await user.click(page2Button)

    expect(mockPush).toHaveBeenCalledWith('/articles/2')
  })
})
