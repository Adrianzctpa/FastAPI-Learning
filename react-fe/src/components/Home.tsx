import React from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../contexts/AuthContext'

function Home() {
    const {logstatus} = React.useContext(AuthContext)

    return (
        <div>
            <h1>Home</h1>
            {logstatus ? 
                <>
                    <Link to='/posts'>Let's check some posts!</Link>
                    <Link to='/login'>Logout</Link>
                </> : (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </>
                )
            }
        </div>
    )
}

export default Home;
