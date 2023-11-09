import { render, screen } from '../../../setupTests';
import Quiz from './quiz';

describe('Quiz', () => {
  it('renders Quiz', () => {
    render(<Quiz />);
    const linkElement = screen.getByTestId('quiz');
    expect(linkElement).toBeInTheDocument();
  });
});
