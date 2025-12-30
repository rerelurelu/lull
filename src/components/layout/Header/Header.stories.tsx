import type { Meta, StoryObj } from '@storybook/react'
import { Header } from './Header'

const meta = {
  title: 'Layout/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
      navigation: {
        push: (url: string) => console.log('Navigate to:', url),
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div>
        <Story />
        <div style={{ height: '200vh', padding: '2rem' }}>
          <h2>Scroll down to see the header hide</h2>
          <p>The header will hide when scrolling down and show when scrolling up.</p>
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
