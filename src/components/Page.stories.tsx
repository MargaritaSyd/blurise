import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stagger } from '../motion/Stagger';
import { Stage } from '../stories/Stage';
import { Badge } from './Badge';
import { Button } from './Button';
import { Card } from './Card';
import { Checkbox } from './Checkbox';
import { Container } from './Container';
import { Grid } from './Grid';
import { Heading } from './Heading';
import { Input } from './Input';
import { Label } from './Label';
import { Link } from './Link';
import { Separator } from './Separator';
import { Stack } from './Stack';
import { Text } from './Text';

const meta = {
  title: 'Kit/Page',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj;

const features = [
  {
    badge: 'Rise',
    title: 'Blur rise',
    body: 'Enter with blur, lift, and opacity — the signature move.',
  },
  {
    badge: 'Stagger',
    title: 'Cascades',
    body: 'Lists inherit --br-i so delays fall in sequence.',
  },
  {
    badge: 'Grain',
    title: 'Film grain',
    body: 'A static overlay. Texture, not another animation.',
  },
];

export const Landing: Story = {
  render: () => (
    <Stage>
      <Container size="lg">
        <Stack gap={8}>
          <Stack gap={4} style={{ maxWidth: '36rem' }}>
            <Badge variant="accent">blurise 0.3</Badge>
            <Heading as="h1">Cinematic UI, mostly CSS.</Heading>
            <Text tone="muted" size="lg">
              A small kit you can use to ship a landing or a form without
              leaving the motion language.
            </Text>
            <Stack direction="row" gap={3} wrap>
              <Button>Start a project</Button>
              <Button variant="ghost">Browse primitives</Button>
            </Stack>
          </Stack>

          <Grid columns={3} gap={4}>
            <Stagger gap={70} style={{ display: 'contents' }}>
              {features.map((feature) => (
                <Card key={feature.title} rise grain>
                  <Badge>{feature.badge}</Badge>
                  <Heading
                    as="h2"
                    size="lg"
                    style={{ marginTop: 'var(--br-space-4)' }}
                  >
                    {feature.title}
                  </Heading>
                  <Text
                    tone="muted"
                    size="sm"
                    style={{ marginTop: 'var(--br-space-2)' }}
                  >
                    {feature.body}
                  </Text>
                </Card>
              ))}
            </Stagger>
          </Grid>

          <Separator />

          <Grid columns={2} gap={8}>
            <Stack gap={3}>
              <Heading as="h2" size="xl">
                Stay in the loop
              </Heading>
              <Text tone="muted">
                A form with the same tokens, focus rings, and quiet motion.
              </Text>
            </Stack>
            <form onSubmit={(event) => event.preventDefault()}>
              <Stack gap={4}>
                <Stack gap={2}>
                  <Label htmlFor="landing-email">Email</Label>
                  <Input
                    id="landing-email"
                    name="email"
                    type="email"
                    placeholder="you@studio.com"
                  />
                </Stack>
                <Stack direction="row" gap={2} align="center">
                  <Checkbox id="landing-ok" name="ok" />
                  <Label
                    htmlFor="landing-ok"
                    style={{ textTransform: 'none', letterSpacing: 0 }}
                  >
                    I agree to occasional notes.{' '}
                    <Link href="#privacy">Privacy</Link>
                  </Label>
                </Stack>
                <Button type="submit">Join the list</Button>
              </Stack>
            </form>
          </Grid>
        </Stack>
      </Container>
    </Stage>
  ),
};
