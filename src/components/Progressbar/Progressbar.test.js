import { render, screen } from '../../setupTests';
import Progressbar from './Progressbar';

test('renders progressbar', () => {
  render(<Progressbar />);
  const linkElement = screen.getByTestId('progressbar');
  expect(linkElement).toBeInTheDocument();
});

test('renders Next button', () => {
  render(<Progressbar />);
  const linkElement = screen.getByTestId('next');
  expect(linkElement).toBeInTheDocument();
});

test('Next button is not clickable on load', () => {
  render(<Progressbar />);
  const linkElement = screen.getByTestId('next');
  expect(linkElement).toBeInTheDocument();
  expect(linkElement).toHaveAttribute('disabled', '');
});

