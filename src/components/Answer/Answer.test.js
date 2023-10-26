import { render, screen } from '@testing-library/react';
import Answer from './Answer';

test('renders navbar', () => {
  render(<Answer />);
  const linkElement = screen.getByTestId('answer');
  expect(linkElement).toBeInTheDocument();
});

