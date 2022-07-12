import React from 'react';
import AuthContext from '../contexts/AuthContext'
import DBContext from '../contexts/DBContext'
import { Link } from 'react-router-dom'

function Login() {
    
    const { login } = React.useContext(AuthContext)
    const { username } = React.useContext(DBContext)

    console.log(username)
    return (
        <div>
            <h1>Login</h1>

            <form onSubmit={login}>
                <label>Username</label>
                <input type='username' id='username' />

                <label>Password</label>
                <input type='password' id='password' />

                <button type='submit'>Submit</button>
            </form>

            <Link to='/'>Go back</Link>
        </div>
    )
}

export default Login;
