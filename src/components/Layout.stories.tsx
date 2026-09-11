import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stage } from '../stories/Stage';
import { Card } from './Card';
import { Container } from './Container';
import { Grid } from './Grid';
import { Heading } from './Heading';
import { Stack } from './Stack';
import { Text } from './Text';

const meta = {
  title: 'Kit/Layout',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Composition overview of layout primitives (Container, Stack, Grid). For interactive API docs and Controls, open each component under Kit.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Structure: Story = {
  render: () => (
    <Stage>
      <Container>
        <Stack gap={5}>
          <Heading as="h2" size="xl">
            Stack, grid, container
          </Heading>
          <Grid columns={3} gap={4}>
            <Card>
              <Text size="sm">One</Text>
            </Card>
            <Card>
              <Text size="sm">Two</Text>
            </Card>
            <Card>
              <Text size="sm">Three</Text>
            </Card>
          </Grid>
        </Stack>
      </Container>
    </Stage>
  ),
};
