import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ShareButton from './ShareButton';

// Mock window.open
global.open = vi.fn();

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn(() => Promise.resolve()),
  },
});

describe('ShareButton Component', () => {
  const mockProject = {
    id: 1,
    title: 'Test Project',
    description: 'A test project description',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render share button', () => {
    render(<ShareButton project={mockProject} />);
    
    const button = screen.getByRole('button', { name: /compartir test project/i });
    expect(button).toBeInTheDocument();
  });

  it('should show share menu when button is clicked', async () => {
    const user = userEvent.setup();
    render(<ShareButton project={mockProject} />);
    
    const button = screen.getByRole('button', { name: /compartir test project/i });
    await user.click(button);
    
    // Check if menu options are visible
    expect(screen.getByRole('menuitem', { name: /compartir en twitter/i })).toBeVisible();
    expect(screen.getByRole('menuitem', { name: /compartir en linkedin/i })).toBeVisible();
    expect(screen.getByRole('menuitem', { name: /compartir en facebook/i })).toBeVisible();
    expect(screen.getByRole('menuitem', { name: /compartir en whatsapp/i })).toBeVisible();
    expect(screen.getByRole('menuitem', { name: /copiar enlace/i })).toBeVisible();
  });

  it('should hide menu when button is clicked again', async () => {
    const user = userEvent.setup();
    render(<ShareButton project={mockProject} />);
    
    const button = screen.getByRole('button', { name: /compartir test project/i });
    
    // Open menu
    await user.click(button);
    expect(screen.getByRole('menu')).toBeVisible();
    
    // Close menu
    await user.click(button);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('should open Twitter share window', async () => {
    const user = userEvent.setup();
    render(<ShareButton project={mockProject} />);
    
    const button = screen.getByRole('button', { name: /compartir test project/i });
    await user.click(button);
    
    const twitterOption = screen.getByRole('menuitem', { name: /compartir en twitter/i });
    await user.click(twitterOption);
    
    expect(window.open).toHaveBeenCalledWith(
      expect.stringContaining('twitter.com/intent/tweet'),
      '_blank',
      'width=600,height=400'
    );
  });

  it('should open LinkedIn share window', async () => {
    const user = userEvent.setup();
    render(<ShareButton project={mockProject} />);
    
    const button = screen.getByRole('button', { name: /compartir test project/i });
    await user.click(button);
    
    const linkedinOption = screen.getByRole('menuitem', { name: /compartir en linkedin/i });
    await user.click(linkedinOption);
    
    expect(window.open).toHaveBeenCalledWith(
      expect.stringContaining('linkedin.com/sharing'),
      '_blank',
      'width=600,height=400'
    );
  });

  it('should open Facebook share window', async () => {
    const user = userEvent.setup();
    render(<ShareButton project={mockProject} />);
    
    const button = screen.getByRole('button', { name: /compartir test project/i });
    await user.click(button);
    
    const facebookOption = screen.getByRole('menuitem', { name: /compartir en facebook/i });
    await user.click(facebookOption);
    
    expect(window.open).toHaveBeenCalledWith(
      expect.stringContaining('facebook.com/sharer'),
      '_blank',
      'width=600,height=400'
    );
  });

  it('should open WhatsApp share window', async () => {
    const user = userEvent.setup();
    render(<ShareButton project={mockProject} />);
    
    const button = screen.getByRole('button', { name: /compartir test project/i });
    await user.click(button);
    
    const whatsappOption = screen.getByRole('menuitem', { name: /compartir en whatsapp/i });
    await user.click(whatsappOption);
    
    expect(window.open).toHaveBeenCalledWith(
      expect.stringContaining('wa.me'),
      '_blank',
      'width=600,height=400'
    );
  });

  it('should copy link to clipboard', async () => {
    const user = userEvent.setup();
    render(<ShareButton project={mockProject} />);
    
    const button = screen.getByRole('button', { name: /compartir test project/i });
    await user.click(button);
    
    const copyOption = screen.getByRole('menuitem', { name: /copiar enlace/i });
    await user.click(copyOption);
    
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      expect.stringContaining('?project=1')
    );
  });

  it('should show success message after copying', async () => {
    const user = userEvent.setup();
    render(<ShareButton project={mockProject} />);
    
    const button = screen.getByRole('button', { name: /compartir test project/i });
    await user.click(button);
    
    const copyOption = screen.getByRole('menuitem', { name: /copiar enlace/i });
    await user.click(copyOption);
    
    // Check for success message
    expect(screen.getByText('¡Copiado!')).toBeInTheDocument();
  });

  it('should have correct ARIA attributes', () => {
    render(<ShareButton project={mockProject} />);
    
    const button = screen.getByRole('button', { name: /compartir test project/i });
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveAttribute('aria-haspopup', 'true');
  });

  it('should update ARIA expanded when menu is open', async () => {
    const user = userEvent.setup();
    render(<ShareButton project={mockProject} />);
    
    const button = screen.getByRole('button', { name: /compartir test project/i });
    
    await user.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
  });

  it('should stop event propagation', async () => {
    const user = userEvent.setup();
    const parentClickHandler = vi.fn();
    
    render(
      <div onClick={parentClickHandler}>
        <ShareButton project={mockProject} />
      </div>
    );
    
    const button = screen.getByRole('button', { name: /compartir test project/i });
    await user.click(button);
    
    // Parent click handler should not be called
    expect(parentClickHandler).not.toHaveBeenCalled();
  });
});
