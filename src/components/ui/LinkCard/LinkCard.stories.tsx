import type { Meta, StoryObj } from '@storybook/react'
import { LinkCard } from './LinkCard'

const meta = {
  title: 'UI/LinkCard',
  component: LinkCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    href: {
      control: 'text',
      description: 'リンク先URL',
    },
    title: {
      control: 'text',
      description: 'カードタイトル',
    },
    description: {
      control: 'text',
      description: 'カードの説明文',
    },
    thumbnail: {
      control: 'text',
      description: 'サムネイル画像のURL',
    },
    siteName: {
      control: 'text',
      description: 'サイト名',
    },
  },
} satisfies Meta<typeof LinkCard>

export default meta
type Story = StoryObj<typeof meta>

export const WithThumbnail: Story = {
  args: {
    href: 'https://github.com',
    title: 'GitHub: Let us build from here',
    description:
      'GitHub is where over 100 million developers shape the future of software, together.',
    thumbnail: 'https://github.githubassets.com/images/modules/site/social-cards/github-social.png',
    siteName: 'GitHub',
  },
}

export const WithoutThumbnail: Story = {
  args: {
    href: 'https://example.com',
    title: 'Example Domain',
    description: 'This domain is for use in illustrative examples in documents.',
    siteName: 'Example',
  },
}
