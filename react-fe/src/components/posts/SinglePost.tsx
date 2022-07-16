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
        id: 0,
        text: ''
    })

    React.useEffect(() => {
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
    }, [id, tokens])

    return (
        <div>
            {info.id === 0 ? <h1>404 - Not found</h1> : (
                <>
                    <h1>Por {info.username}</h1>
                    <h2>{info.text}</h2>

                    <PostOptions id={id} username={info.username} />
                </>
            )}
        </div>
    )
}

export default SinglePost;