import { render, screen } from '@testing-library/react';
import Progressbar from './Progressbar';

test('renders progressbar', () => {
  render(<Progressbar />);
  const linkElement = screen.getByTestId('progressbar');
  expect(linkElement).toBeInTheDocument();
});

