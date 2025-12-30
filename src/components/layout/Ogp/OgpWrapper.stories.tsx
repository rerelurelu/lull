import type { Meta, StoryObj } from '@storybook/react'
import { OgpWrapper } from './OgpWrapper'

const meta = {
  title: 'Layout/OgpWrapper',
  component: OgpWrapper,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof OgpWrapper>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <div style={{ fontSize: 72, fontWeight: 'bold', lineHeight: 1.2 }}>サンプルタイトル</div>
    ),
  },
}
