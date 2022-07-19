import React from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../contexts/AuthContext'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

function Home() {
    const {logstatus} = React.useContext(AuthContext)

    return (
        <div>
            <CssBaseline />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    '& > *': {
                        m: 1,
                    },
            }}>
                <h1>Home</h1>
                <ButtonGroup sx={{padding:'10px', gap: "10px"}} aria-label="vertical contained button group" variant='contained'>
                    {logstatus ? 
                    <>
                        <Link to='/posts'><Button>Posts</Button></Link>
                        <Link to='/posts/create'><Button>Create Post</Button></Link>
                        <Link to='/login'><Button>Logout</Button></Link>
                    </> : (
                    <>
                        <Link to="/login"><Button>Login</Button></Link>
                        <Link to="/register"><Button>Register</Button></Link>
                    </>    
                    )}
                </ButtonGroup>
            </Box>
        </div>
    )
}

export default Home;
