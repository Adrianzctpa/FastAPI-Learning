import React from 'react';
import AuthContext from '../contexts/AuthContext'
import DBContext from '../contexts/DBContext'
import { Link } from 'react-router-dom'

function Login() {
    
    const { login, logout, logstatus } = React.useContext(AuthContext)
    const { username } = React.useContext(DBContext)

    return (
        <>
            {logstatus ?
                <>
                    <h1>Hello {username}!</h1>
                    <button onClick={logout}>Click me to logout!</button>           
                </> : (
                <>
                    <h1>Login</h1>

                    <form onSubmit={login}>
                        <label>Username</label>
                        <input type='username' id='username' />
        
                        <label>Password</label>
                        <input type='password' id='password' />
        
                        <button type='submit'>Submit</button>
                    </form>
                    <Link to="/register">Register</Link>
                </>
            )}
            <Link to='/'>Go back</Link>
        </>
    )
}

export default Login;