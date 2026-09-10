import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './Accordion';
import { Button } from './Button';
import { Dialog } from './Dialog';
import { Menu, MenuContent, MenuItem, MenuTrigger } from './Menu';
import { Tab, TabList, TabPanel, Tabs } from './Tabs';
import { ToastProvider, useToast } from './Toast';
import { Tooltip } from './Tooltip';
import { useState } from 'react';

function DialogHarness() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open dialog</Button>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="Cut"
        description="Remove this take?"
      >
        <Button onClick={() => setOpen(false)}>Cancel</Button>
      </Dialog>
    </>
  );
}

function ToastHarness() {
  const { toast } = useToast();
  return (
    <Button onClick={() => toast({ title: 'Saved', description: 'On disk.' })}>
      Notify
    </Button>
  );
}

describe('Dialog', () => {
  it('opens, traps a title, and closes on Escape', () => {
    render(<DialogHarness />);
    fireEvent.click(screen.getByRole('button', { name: 'Open dialog' }));
    expect(screen.getByRole('dialog', { name: 'Cut' })).toBeInTheDocument();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});

describe('Menu', () => {
  it('opens and closes after selecting an item', () => {
    const onSelect = vi.fn();
    render(
      <Menu>
        <MenuTrigger>Actions</MenuTrigger>
        <MenuContent>
          <MenuItem onSelect={onSelect}>Duplicate</MenuItem>
        </MenuContent>
      </Menu>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Actions' }));
    expect(screen.getByRole('menu')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('menuitem', { name: 'Duplicate' }));
    expect(onSelect).toHaveBeenCalled();
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });
});

describe('Tooltip', () => {
  it('shows on focus', async () => {
    render(
      <Tooltip content="Export the sequence" delay={0}>
        <Button>Export</Button>
      </Tooltip>,
    );

    fireEvent.focus(screen.getByRole('button', { name: 'Export' }));
    expect(await screen.findByRole('tooltip')).toHaveTextContent(
      'Export the sequence',
    );
  });
});

describe('Toast', () => {
  it('announces a toast from useToast', () => {
    render(
      <ToastProvider duration={30_000}>
        <ToastHarness />
      </ToastProvider>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Notify' }));
    expect(screen.getByRole('status')).toHaveTextContent('Saved');
  });
});

describe('Tabs', () => {
  it('switches panels', () => {
    render(
      <Tabs defaultValue="cast">
        <TabList label="Editorial">
          <Tab value="cast">Cast</Tab>
          <Tab value="grade">Grade</Tab>
        </TabList>
        <TabPanel value="cast">Cast notes</TabPanel>
        <TabPanel value="grade">Grade notes</TabPanel>
      </Tabs>,
    );

    expect(screen.getByRole('tabpanel')).toHaveTextContent('Cast notes');
    fireEvent.click(screen.getByRole('tab', { name: 'Grade' }));
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Grade notes');
  });
});

describe('Accordion', () => {
  it('expands a closed item', () => {
    render(
      <Accordion defaultValue="rise">
        <AccordionItem value="rise">
          <AccordionTrigger>Blur rise</AccordionTrigger>
          <AccordionContent>Enter softly</AccordionContent>
        </AccordionItem>
        <AccordionItem value="grain">
          <AccordionTrigger>Grain</AccordionTrigger>
          <AccordionContent>Texture only</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    const grain = screen.getByRole('button', { name: 'Grain' });
    expect(grain).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(grain);
    expect(grain).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('Texture only')).toBeVisible();
  });
});
