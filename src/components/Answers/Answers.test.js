import { render, screen } from '@testing-library/react';
import Answers from './Answers';

test('renders navbar', () => {
  render(<Answers />);
  const linkElement = screen.getByTestId('answers');
  expect(linkElement).toBeInTheDocument();
});

