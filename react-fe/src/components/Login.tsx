import React from 'react';
import AuthContext from '../contexts/AuthContext'
import DBContext from '../contexts/DBContext'
import { Link } from 'react-router-dom'
import UserForm from './UserForm'

import Button from '@mui/material/Button'

function Login() {
    
    const { login, logout, logstatus } = React.useContext(AuthContext)
    const { username } = React.useContext(DBContext)

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px'}}>
            {logstatus ?
                <>
                    <h1>Hello {username}!</h1>
                    <Button variant="contained" onClick={logout}>Logout</Button>           
                </> : (
                <>
                    <UserForm mode="Login" func={login} />
                    <Link to='/register'><Button color="secondary" variant="contained">Don't have an account?</Button></Link>
                </>
            )}
            <Link to='/'><Button color="info" variant="contained">Go Back</Button></Link>
        </div>
    )
}

export default Login;