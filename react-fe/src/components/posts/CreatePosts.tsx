import React from 'react'
import AuthContext from '../../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

function CreatePosts() {
    const {tokens} = React.useContext(AuthContext)
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        let response = await fetch('/api/posts', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokens.access}`
            },
            body: JSON.stringify({
                'text': e.currentTarget.text.value
            })
        })
        let data = await response.json()

        if (response.status === 200) {
            alert('Post created')
            navigate(`/posts/${data.id}`)
        }
    }

    return (
        <div>
            <h1>Create Posts</h1>
            <form onSubmit={handleSubmit}>
                <label>Text</label>
                <input type='text' id='text' />

                <button type='submit'>Submit</button>
            </form>
            <Link to='/'>Go back</Link>
        </div>
    )
}

export default CreatePosts;