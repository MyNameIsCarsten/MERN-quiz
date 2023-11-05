import { useDispatch, useSelector } from 'react-redux';
import './Login.css';
import { useState } from 'react'
import { login } from '../../App/appSlice';

const Login = () => {
    const dispatch = useDispatch();

    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const isLoading = useSelector((state) => state.app.isLoading);

    
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login({username, password})) // sent POST request when form is submitted
    }



  return (
    <div>
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
