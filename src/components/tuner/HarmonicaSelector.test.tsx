import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HarmonicaSelector from './HarmonicaSelector';

describe('HarmonicaSelector', () => {
  test('clicking 十孔标准调音 button calls onSelect with diatonic_standard', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<HarmonicaSelector onSelect={onSelect} />);

    const button = screen.getByRole('button', { name: /十孔标准调音/ });
    await user.click(button);

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith('diatonic_standard');
  });

  test('clicking 十二孔半音阶口琴 button calls onSelect with chromatic_12hole', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<HarmonicaSelector onSelect={onSelect} />);

    const button = screen.getByRole('button', { name: /十二孔半音阶口琴/ });
    await user.click(button);

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith('chromatic_12hole');
  });

  test('renders both harmonica buttons', () => {
    const onSelect = vi.fn();
    render(<HarmonicaSelector onSelect={onSelect} />);

    expect(screen.getByRole('button', { name: /十孔标准调音/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /十二孔半音阶口琴/ })).toBeInTheDocument();
  });
});
