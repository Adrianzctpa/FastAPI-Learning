import React from 'react'
import AuthContext from '../../contexts/AuthContext';
import {useNavigate} from 'react-router-dom'
import DBContext from '../../contexts/DBContext'
import PostForm from './PostForm'

import Button from "@mui/material/Button"

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

    const handleUpdate = () => {
        if (document.getElementById('formtarget')!.style.display === 'none') {
            document.getElementById('formtarget')!.style.display = 'table'
            document.getElementById('upd')!.textContent = 'Close'
        } else {
            document.getElementById('formtarget')!.style.display = 'none'
            document.getElementById('upd')!.textContent = 'Update Post'
        }
    }

    const updatePost = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const quillHtmlContent = document.querySelector(".ql-editor")?.innerHTML
        const quillContent = document.querySelector(".ql-editor")?.textContent
        
        let response = await fetch(`/api/posts/${id}`, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokens.access}`
            },
            body: JSON.stringify({
                'title': e.currentTarget.text.value,
                'textHtml': quillHtmlContent,
                'text': quillContent,
            })
        })

        if (response.status === 200) {
            alert('Post updated')
        }
    }

    return (
        <>
            <div>
                {context.username === username ? 
                <>
                    <Button variant="outlined" onClick={deletePost}>Delete Post</Button> 
                    <Button variant="contained" id="upd" onClick={handleUpdate}>Update Post</Button>
                </> 
                : null}
            </div>
            <div id="formtarget" style={{display: 'none', marginTop: '20px'}}>
                <PostForm mode="update" func={updatePost} />
            </div>
        </>
    )
}

export default PostOptions;