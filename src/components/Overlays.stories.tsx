import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stage } from '../stories/Stage';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './Accordion';
import { Button } from './Button';
import { Dialog } from './Dialog';
import {
  Menu,
  MenuContent,
  MenuItem,
  MenuSeparator,
  MenuTrigger,
} from './Menu';
import { Stack } from './Stack';
import { Tab, TabList, TabPanel, Tabs } from './Tabs';
import { Text } from './Text';
import { ToastProvider, useToast } from './Toast';
import { Tooltip } from './Tooltip';

const meta = {
  title: 'Kit/Overlays',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj;

function DialogDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Discard take</Button>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="Discard this take?"
        description="The clip leaves the timeline. This cannot be undone."
      >
        <Stack direction="row" gap={3} justify="end">
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Keep
          </Button>
          <Button variant="danger" onClick={() => setOpen(false)}>
            Discard
          </Button>
        </Stack>
      </Dialog>
    </>
  );
}

function ToastDemo() {
  const { toast } = useToast();

  return (
    <Stack direction="row" gap={3} wrap>
      <Button
        onClick={() =>
          toast({
            title: 'Export started',
            description: 'Your reel is rendering in the background.',
          })
        }
      >
        Show toast
      </Button>
      <Button variant="ghost" onClick={() => toast('Saved to disk')}>
        Quick save
      </Button>
    </Stack>
  );
}

export const DialogStory: Story = {
  name: 'Dialog',
  render: () => (
    <Stage>
      <DialogDemo />
    </Stage>
  ),
};

export const MenuStory: Story = {
  name: 'Menu',
  render: () => (
    <Stage>
      <Menu>
        <MenuTrigger>Actions</MenuTrigger>
        <MenuContent>
          <MenuItem onSelect={() => undefined}>Duplicate</MenuItem>
          <MenuItem onSelect={() => undefined}>Rename</MenuItem>
          <MenuSeparator />
          <MenuItem tone="danger" onSelect={() => undefined}>
            Delete
          </MenuItem>
        </MenuContent>
      </Menu>
    </Stage>
  ),
};

export const TooltipStory: Story = {
  name: 'Tooltip',
  render: () => (
    <Stage>
      <Tooltip content="Export the current sequence">
        <Button>Export</Button>
      </Tooltip>
    </Stage>
  ),
};

export const ToastStory: Story = {
  name: 'Toast',
  render: () => (
    <ToastProvider>
      <Stage>
        <ToastDemo />
      </Stage>
    </ToastProvider>
  ),
};

export const TabsStory: Story = {
  name: 'Tabs',
  render: () => (
    <Stage>
      <Tabs defaultValue="cast">
        <TabList label="Editorial">
          <Tab value="cast">Cast</Tab>
          <Tab value="light">Light</Tab>
          <Tab value="grade">Grade</Tab>
        </TabList>
        <TabPanel value="cast">
          <Text tone="muted" size="sm">
            Faces stay sharp. Motion does the rest.
          </Text>
        </TabPanel>
        <TabPanel value="light">
          <Text tone="muted" size="sm">
            Warm key, cool fill. Keep the grain in the shadows.
          </Text>
        </TabPanel>
        <TabPanel value="grade">
          <Text tone="muted" size="sm">
            Paper highlights, ink blacks, gold accent.
          </Text>
        </TabPanel>
      </Tabs>
    </Stage>
  ),
};

export const AccordionStory: Story = {
  name: 'Accordion',
  render: () => (
    <Stage>
      <div style={{ maxWidth: '28rem' }}>
        <Accordion defaultValue="rise">
          <AccordionItem value="rise">
            <AccordionTrigger>Blur rise</AccordionTrigger>
            <AccordionContent>
              Enter with blur, lift, and opacity. Overlays use a shorter rise so
              they feel snappy.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="grain">
            <AccordionTrigger>Grain</AccordionTrigger>
            <AccordionContent>
              Texture sits on the surface. It is not another animation loop.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="float">
            <AccordionTrigger>Idle float</AccordionTrigger>
            <AccordionContent>
              Cards may float. Dialogs never do.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </Stage>
  ),
};
