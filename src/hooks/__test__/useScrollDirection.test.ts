import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { useScrollDirection } from '../useScrollDirection'

describe('useScrollDirection', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 0,
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  test('初期状態は up である', () => {
    const { result } = renderHook(() => useScrollDirection())
    expect(result.current).toBe('up')
  })

  test('100px以下のスクロールでは up のままである', () => {
    const { result } = renderHook(() => useScrollDirection())
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 100,
    })
    act(() => {
      window.dispatchEvent(new Event('scroll'))
    })
    expect(result.current).toBe('up')
  })

  test('100pxを超えて下スクロールすると down になる', () => {
    const { result } = renderHook(() => useScrollDirection())
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 101,
    })
    act(() => {
      window.dispatchEvent(new Event('scroll'))
    })
    expect(result.current).toBe('down')
  })

  test('上スクロールすると up になる', () => {
    const { result } = renderHook(() => useScrollDirection())

    // 下スクロール
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 150,
    })
    act(() => {
      window.dispatchEvent(new Event('scroll'))
    })
    expect(result.current).toBe('down')

    // 上スクロール
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 50,
    })
    act(() => {
      window.dispatchEvent(new Event('scroll'))
    })
    expect(result.current).toBe('up')
  })

  test('連続して上下スクロールした場合', () => {
    const { result } = renderHook(() => useScrollDirection())

    // 150pxまで下スクロール
    Object.defineProperty(window, 'scrollY', { value: 150 })
    act(() => window.dispatchEvent(new Event('scroll')))
    expect(result.current).toBe('down')

    // 200pxまでさらに下スクロール
    Object.defineProperty(window, 'scrollY', { value: 200 })
    act(() => window.dispatchEvent(new Event('scroll')))
    expect(result.current).toBe('down')

    // 100pxまで上スクロール
    Object.defineProperty(window, 'scrollY', { value: 100 })
    act(() => window.dispatchEvent(new Event('scroll')))
    expect(result.current).toBe('up')

    // 50pxまでさらに上スクロール
    Object.defineProperty(window, 'scrollY', { value: 50 })
    act(() => window.dispatchEvent(new Event('scroll')))
    expect(result.current).toBe('up')
  })

  test('unmount時にイベントリスナーが削除される', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')

    const { unmount } = renderHook(() => useScrollDirection())
    unmount()

    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function))
    removeEventListenerSpy.mockRestore()
  })
})
