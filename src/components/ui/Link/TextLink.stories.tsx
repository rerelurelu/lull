import type { Meta, StoryObj } from '@storybook/react'
import { TextLink } from './TextLink'

const meta = {
  title: 'UI/Link/TextLink',
  component: TextLink,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: 'リンクテキスト',
    },
    href: {
      control: 'text',
      description: 'リンク先URL',
    },
  },
} satisfies Meta<typeof TextLink>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    text: '詳細を見る',
    href: '/about',
  },
}
