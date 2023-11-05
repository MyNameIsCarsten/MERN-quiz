import { Link } from 'react-router-dom';
import './Navbar.css';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.app.isLoggedIn);

  return (
    <div data-testid='navbar'>
        {isLoggedIn ? (
          <nav>
            <Link to="/">Home</Link>
            <Link to="/quiz/add">Add Quiz</Link>
            <Link to="/quiz">Quiz List</Link>
          </nav>
        ) : (
          <nav style={{ display:'flex', justifyContent:'center' }}>Welcome, please login!</nav>
        )}
    </div>
  )
}

export default Navbar
