import { render, screen } from '../../setupTests';
import Answer from './Answer';

test('renders answer', () => {
  render(<Answer />);
  const linkElement = screen.getByTestId('answer');
  expect(linkElement).toBeInTheDocument();
});

