import { render, screen } from '../../../setupTests';
import Navbar from './Navbar';

describe('Navbar', () => {
  it('renders navbar', () => {
    render(<Navbar />);
    const linkElement = screen.getByTestId('navbar');
    expect(linkElement).toBeInTheDocument();
  });
});
