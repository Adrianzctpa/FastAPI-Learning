import React from 'react'
import AuthContext from '../../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import Quill from 'quill'
import "../../static/quill.snow.css"

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

    React.useEffect(() => {
        const options = {
            modules: {
              toolbar: [
                [{ header: [1, 2, false] }],
                ['bold', 'italic', 'underline'],
              ]
            },
            placeholder: 'Compose an epic...',
            theme: 'snow'
        };

        const edDiv = document.getElementById('editor')
        new Quill(edDiv, options)
        const elements = document.getElementsByClassName('ql-toolbar')

        if (elements.length > 1) {
            const parent = document.getElementById('test')
            parent!.removeChild(elements[0])
        }
    }, [])

    return (
        <div>
            <h1>Create Posts</h1>
            <form id="form" onSubmit={handleSubmit}>
                <label>Title</label>
                <input type='text' id='text' />

                <label>Content</label>
                <div id="test">
                    <div id="editor" />
                </div>
                
                <button type='submit'>Submit</button>
            </form>
            <Link to='/'>Go back</Link>
        </div>
    )
}

export default CreatePosts;