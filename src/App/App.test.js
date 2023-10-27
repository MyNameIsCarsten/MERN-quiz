import { render, screen } from '../setupTests';
import App from './App';

test('renders question', () => {
  render(<App />);
  const linkElement = screen.getByText(/question/i);
  expect(linkElement).toBeInTheDocument();
});
