import { render, screen } from '@testing-library/react';
import Question from './Question';

test('renders question', () => {
  render(<Question />);
  const linkElement = screen.getByTestId('question');
  expect(linkElement).toBeInTheDocument();
});
