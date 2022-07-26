import React from 'react'
import AuthContext from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import PostForm from './PostForm'

function CreatePosts() {
    
    const {tokens} = React.useContext(AuthContext)
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const quillHtmlContent = document.querySelector(".ql-editor")?.innerHTML
        const quillContent = document.querySelector(".ql-editor")?.textContent

        let response = await fetch('/api/posts', {
            method: 'POST',
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
        let data = await response.json()

        if (response.status === 200) {
            alert('Post created')
            navigate(`/posts/${data.id}`)
        }
    }

    return (
        <PostForm mode="create" func={handleSubmit}/>
    )
}

export default CreatePosts;