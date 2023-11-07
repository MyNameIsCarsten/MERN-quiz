import { render, screen } from '../../../setupTests';
import Question from './Question';

describe('Question', () => {
  it('renders question', () => {
    render(<Question />);
    const linkElement = screen.getByTestId('question');
    expect(linkElement).toBeInTheDocument();
  });
});