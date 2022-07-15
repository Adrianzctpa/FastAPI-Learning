import React from 'react'
import DBContext from '../../contexts/DBContext';
import {useNavigate} from 'react-router-dom'

function Posts() {
    const {posts} = React.useContext(DBContext)
    const [loop, setLoop] = React.useState<any>('')
    const navigate = useNavigate()

    React.useEffect(() => {
        const values = Object.values(posts) 

        const postLoop = values.map((post) => {
            return ( 
                <div onClick={() => navigate(`/posts/${post.id}`)} key={post.id}>
                    <h1>{post.text}</h1>
                    <h5>por {post.username}</h5>
                </div>
            )
        })
        setLoop(postLoop)
        console.log(posts)
    }, [posts, navigate])

    return (
        <div>
            {loop}
        </div>
    )
}

export default Posts;
