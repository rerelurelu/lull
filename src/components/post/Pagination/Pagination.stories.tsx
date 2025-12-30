import type { Meta, StoryObj } from '@storybook/react'
import { Pagination } from './Pagination'

const meta = {
  title: 'Post/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
      navigation: {
        push: (url: string) => console.log('Navigate to:', url),
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    count: {
      control: 'number',
      description: '総ページ数',
    },
    defaultPage: {
      control: 'number',
      description: '現在のページ番号',
    },
    baseUrl: {
      control: 'text',
      description: 'ベースURL',
    },
  },
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    count: 120,
    pageSize: 12,
    siblingCount: 1,
    defaultPage: 1,
    baseUrl: 'posts',
  },
}

export const CurrentPageMiddle: Story = {
  args: {
    count: 240,
    pageSize: 12,
    siblingCount: 1,
    defaultPage: 10,
    baseUrl: 'posts',
  },
}
