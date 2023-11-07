import { render, screen } from '../../../setupTests';
import Answer from './Answer';

describe('Answers', () => {
  it('renders answer', () => {
    render(<Answer />);
    const linkElement = screen.getByTestId('answer');
    expect(linkElement).toBeInTheDocument();
  });
});
