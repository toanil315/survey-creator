import type { Meta, StoryObj } from '@storybook/react';
import { Row } from '.';
import { Col } from '../Col';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Row> = {
  title: 'Components/Row',
  component: Row,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
    docs: {
      description: {
        component: 'Row component, nothing new here.',
      },
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Row>;

export const Primary: Story = {
  args: {
    gutter: 16,
  },
  render: (props) => {
    const children = <div style={{ color: 'white', background: 'blue' }}>col-6</div>;

    return (
      <Row
        {...props}
        style={{
          width: 500,
        }}
      >
        <Col span={6}>{children}</Col>
        <Col span={6}>{children}</Col>
        <Col span={6}>{children}</Col>
        <Col span={6}>{children}</Col>
      </Row>
    );
  },
};

export const Vertical: Story = {
  args: {
    gutter: [16, 16],
  },
  render: (props) => {
    const children = <div style={{ color: 'white', background: 'blue' }}>col-6</div>;

    return (
      <Row
        {...props}
        style={{
          width: 500,
        }}
      >
        <Col span={6}>{children}</Col>
        <Col span={6}>{children}</Col>
        <Col span={6}>{children}</Col>
        <Col span={6}>{children}</Col>
        <Col span={6}>{children}</Col>
        <Col span={6}>{children}</Col>
        <Col span={6}>{children}</Col>
        <Col span={6}>{children}</Col>
      </Row>
    );
  },
};
