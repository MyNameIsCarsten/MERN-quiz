import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <div data-testid='navbar'>
      <nav>
        <Link to="">Home</Link>
        <Link to="/quiz">Quiz List</Link>
      </nav>
    </div>
  )
}

export default Navbar
