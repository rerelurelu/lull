import type { Meta, StoryObj } from '@storybook/react'
import { PostCard } from './PostCard'

const meta = {
  title: 'Post/PostCard',
  component: PostCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: '記事のタイトル',
    },
    href: {
      control: 'text',
      description: '記事へのリンク',
    },
    createdAt: {
      control: 'text',
      description: '作成日時',
    },
    postId: {
      control: 'text',
      description: '記事ID',
    },
  },
} satisfies Meta<typeof PostCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Next.js 15の新機能を試してみた',
    href: '/post/sample-post',
    createdAt: '2024-12-01T00:00:00Z',
    postId: 'sample-post',
    tags: [
      { id: '1', tagName: 'Next.js' },
      { id: '2', tagName: 'React' },
      { id: '3', tagName: 'TypeScript' },
    ],
  },
}

export const LongTitle: Story = {
  args: {
    title:
      'これは非常に長いタイトルの例です。長いタイトルでも適切に表示されることを確認するためのサンプルです。',
    href: '/post/long-title',
    createdAt: '2024-11-20T00:00:00Z',
    postId: 'long-title',
    tags: [{ id: '1', tagName: 'Example' }],
  },
}
