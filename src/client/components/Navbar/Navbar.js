import { Link } from 'react-router-dom';
import './Navbar.css';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../App/appSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.app.isLoggedIn);

  const clickHandler = () => {
    dispatch(logout((error) => {
      if (error) {
        // Handle any errors that occurred during the logout process.
        console.error(error);
      }
    }));
  }
  
  return (
    <div data-testid='navbar'>
        {isLoggedIn ? (
          <nav>
            <div className='leftNav'>
              <Link to="/">Home</Link>
            </div>
            <div className='rightNav'>
                <Link to="/quiz/add">Add Quiz</Link>
                <span>|</span>
                <Link to="/quiz">Quiz List</Link>
                <span>|</span>
                <Link to="/settings">Settings</Link>
                <span>|</span>
              <button id='logoutBtn' onClick={clickHandler}>Logout</button>
              
            </div>
          </nav>
        ) : (
          <nav style={{ display:'flex', justifyContent:'center' }}>Welcome, please login!</nav>
        )}
    </div>
  )
}

export default Navbar
