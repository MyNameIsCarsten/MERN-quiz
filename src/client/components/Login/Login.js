import { useDispatch, useSelector } from 'react-redux';
import './Login.css';
import { useState } from 'react'
import { login } from '../../App/appSlice';

const Login = () => {
    const dispatch = useDispatch();

    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const isLoading = useSelector((state) => state.app.isLoading);
    const errorMessage = useSelector((state) => state.app.errorMessage);

    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (username === '' || password ===''){
          alert('Please enter a username and password.')
        } else {
          dispatch(login({username, password})) // sent POST request when form is submitted
        }
    }

  return (
    <div data-testid='login'>
      <p id='error'>{errorMessage !== '' && !isLoading ? errorMessage : ''}</p>
      {!isLoading ? <form id="loginForm" onSubmit={handleSubmit}>
            <label htmlFor='username'>Username:</label>
            <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />

            <label htmlFor='password'>Password:</label>
            <input 
                type="password" 
                id="password"  
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                />

            <button type="submit" id="submitBttn" >Login</button>
        </form>
        :
        <p id="loading" style={{ display:'flex', justifyContent:'center' }}>Please wait while you are being logged in.</p>
        }
    </div>
  )
}

export default Login
