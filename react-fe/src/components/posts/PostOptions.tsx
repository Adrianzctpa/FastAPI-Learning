import React from 'react'
import AuthContext from '../../contexts/AuthContext';
import {useNavigate} from 'react-router-dom'
import DBContext from '../../contexts/DBContext'

type postProps = {
    id : string | undefined,
    username : string
}

function PostOptions( { id, username } : postProps ) {

    const context = React.useContext(DBContext)
    const navigate = useNavigate()
    const { tokens } = React.useContext(AuthContext)

    const deletePost = async () => {
        if (!window.confirm("Are you sure you want to delete this post?")) return

        let response = await fetch(`/api/posts/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${tokens.access}`
            }
        })

        if (response.status === 204) {
            navigate('/posts')
            window.location.reload()
        }
    }

    const updatePost = async (e: React.FormEvent<HTMLFormElement>) => {
        let response = await fetch(`/api/posts/${id}`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokens.access}`
            },
            body: JSON.stringify({
                'text': e.currentTarget.text.value
            })
        })

        if (response.status === 200) {
            alert('Post updated')
        }
    }

    return (
        <div>
            {context.username === username ? <button onClick={deletePost}>Delete Post</button> : null}

            <form onSubmit={updatePost} style={{display: 'none'}}>
                <label>Text</label>
                <input type='text' id='text' />

                <button type='submit'>Update</button>
            </form>
        </div>
    )
}

export default PostOptions;