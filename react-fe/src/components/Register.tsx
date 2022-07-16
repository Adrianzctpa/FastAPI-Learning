import React from 'react';
import { Link, useNavigate } from 'react-router-dom'

function Register() {
    
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let response = await fetch('/api/user/register', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                'username': e.currentTarget.username.value,
                'password': e.currentTarget.password.value
            })
        })

        if (response.status === 200) {
            alert('User created')
            navigate('/login')
        }
    }

    return (
        <>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label>Username</label>
                <input type='username' id='username' />

                <label>Password</label>
                <input type='password' id='password' />

                <button type='submit'>Submit</button>
            </form>
            <Link to='/'>Go back</Link>
        </>
    )
}

export default Register;