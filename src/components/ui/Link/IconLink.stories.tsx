import type { Meta, StoryObj } from '@storybook/react'
import { IconLink } from './IconLink'

const meta = {
  title: 'UI/Link/IconLink',
  component: IconLink,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    href: {
      control: 'text',
      description: 'リンク先URL',
    },
    areaLabel: {
      control: 'text',
      description: 'アクセシビリティラベル',
    },
    src: {
      control: 'text',
      description: 'アイコン画像のパス',
    },
    width: {
      control: 'number',
      description: 'アイコンの幅',
    },
    height: {
      control: 'number',
      description: 'アイコンの高さ',
    },
    alt: {
      control: 'text',
      description: '画像の代替テキスト',
    },
    target: {
      control: 'select',
      options: ['_blank', '_self'],
      description: 'リンクターゲット',
    },
  },
} satisfies Meta<typeof IconLink>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    href: 'https://github.com',
    areaLabel: 'GitHubプロフィール',
    src: '/images/github-icon.webp',
    width: 24,
    height: 24,
    alt: 'GitHub',
    target: '_blank',
  },
}
