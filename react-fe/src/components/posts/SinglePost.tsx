import React from 'react'
import { useParams } from 'react-router-dom'
import AuthContext from '../../contexts/AuthContext';
import { Post } from '../../contexts/DBContext'; 
import PostOptions from './PostOptions';

function SinglePost() {

    const { tokens } = React.useContext(AuthContext)
    const { id } = useParams<{id: string | undefined}>()
    const [info, setInfo] = React.useState<Post>({
        username: '',
        title: '',
        id: 0,
        text: '',
        textHtml: ''
    })

    React.useEffect(() => {
        let editarea = document.getElementById('user-edit-area')

        if (info.id !==  0) {
            editarea!.innerHTML = info.textHtml
            return
        }

        const postCheck = async () => {
            let response = await fetch(`/api/posts/${id}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${tokens.access}`
                }
            })
            let data = await response.json()
    
            if (response.status === 200) {
                setInfo(data)
            } 
        }

        postCheck()
    }, [id, tokens, info])

    return (
        <div>
            {info.id === 0 ? <h1>404 - Not found</h1> : (
                <> 
                    <h1>{info.title}</h1>
                    <h4>Por {info.username}</h4>
                    <div id='user-edit-area'/>

                    <PostOptions id={id} username={info.username} />
                </>
            )}
        </div>
    )
}

export default SinglePost;