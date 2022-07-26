import React from 'react'
import { Link } from 'react-router-dom'

import Quill from 'quill'
import "../../static/quill.snow.css"
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

interface Props {
    mode: string,
    func: (e: React.FormEvent<HTMLFormElement>) => void,

}

function PostForm({mode, func}: Props) {

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
        <div id="postform" style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            {mode === 'create' ? <h1>Create Post</h1> : (null)}
            <form style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px'}} id="form" onSubmit={func}>
                <TextField type='text' id="text" label="Title" variant="outlined" />

                <div id="test">
                    <div id="editor" />
                </div>
                
                <Button variant="contained" type='submit'>Submit</Button>
                <Link to='/'><Button color="secondary" variant="contained">Go Back</Button></Link>
            </form>
        </div>
    )
}

export default PostForm;