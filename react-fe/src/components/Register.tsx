import React from 'react';
import { Link, useNavigate } from 'react-router-dom'
import UserForm from './UserForm'

import Button from '@mui/material/Button'

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
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px'}}>
            <UserForm mode="Register" func={handleSubmit} />
            <Link to='/'><Button color="info" variant="contained">Go Back</Button></Link>
        </div>
    )
}

export default Register;