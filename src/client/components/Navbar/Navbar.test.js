import { render, screen } from '../../setupTests';
import Navbar from './Navbar';

test('renders navbar', () => {
  render(<Navbar />);
  const linkElement = screen.getByTestId('navbar');
  expect(linkElement).toBeInTheDocument();
});

