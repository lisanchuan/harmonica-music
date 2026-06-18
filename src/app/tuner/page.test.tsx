import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TunerPage from './page';

vi.mock('@/hooks/tuner/usePitchDetector', () => ({
  usePitchDetector: () => ({
    isListening: false,
    pitch: null,
    volume: 0,
    error: null,
    start: vi.fn(),
    stop: vi.fn(),
  }),
}));

describe('TunerPage interaction flow', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('initially shows the harmonica selector', () => {
    render(<TunerPage />);
    expect(screen.getByRole('heading', { name: /请选择你的口琴/ })).toBeInTheDocument();
  });

  test('clicking 十孔标准调音 transitions to tuner main view', async () => {
    const user = userEvent.setup();
    render(<TunerPage />);

    await user.click(screen.getByRole('button', { name: /十孔标准调音/ }));

    expect(screen.queryByRole('heading', { name: /请选择你的口琴/ })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /更换口琴/ })).toBeInTheDocument();
  });

  test('clicking 十二孔半音阶口琴 transitions to tuner main view', async () => {
    const user = userEvent.setup();
    render(<TunerPage />);

    await user.click(screen.getByRole('button', { name: /十二孔半音阶口琴/ }));

    expect(screen.queryByRole('heading', { name: /请选择你的口琴/ })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /更换口琴/ })).toBeInTheDocument();
  });

  test('after selecting, clicking back button returns to selector', async () => {
    const user = userEvent.setup();
    render(<TunerPage />);

    await user.click(screen.getByRole('button', { name: /十孔标准调音/ }));
    await user.click(screen.getByRole('button', { name: /更换口琴/ }));

    expect(screen.getByRole('heading', { name: /请选择你的口琴/ })).toBeInTheDocument();
  });
});
