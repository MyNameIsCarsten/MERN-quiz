import { render, screen } from '../setupTests';
import App from './App';

test('renders question', () => {
  render(<App />);
  const linkElement = screen.getByTestId('question');
  expect(linkElement).toBeInTheDocument();
});
