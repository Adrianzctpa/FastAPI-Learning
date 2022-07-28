import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'

interface Props {
    mode: string,
    func: (e: React.FormEvent<HTMLFormElement>) => void,
}

function UserForm({mode, func}: Props) {

    return (
        <div id="userform" style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}> 
            <h1>{mode}</h1>

            <form style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px'}} onSubmit={func}>
                <TextField
                id="outlined-username-input"
                label="Username"
                name="username"
                />

                <TextField
                id="outlined-password-input"
                label="Password"
                type="password"
                name="password"
                autoComplete="current-password"
                />

                <Button variant="contained" type='submit'>Submit</Button>
            </form>
        </div>
    )
}

export default UserForm;