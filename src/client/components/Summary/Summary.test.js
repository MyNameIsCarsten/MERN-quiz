import { render, screen } from '../../setupTests';
import Summary from './Summary';

test('renders summary', () => {
  render(<Summary />);
  const linkElement = screen.getByTestId('summary');
  expect(linkElement).toBeInTheDocument();
});


