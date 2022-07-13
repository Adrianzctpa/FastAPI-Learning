import React from 'react'
import { Link } from 'react-router-dom'
import DBContext from '../contexts/DBContext';

function Home() {
    const {posts} = React.useContext(DBContext)
    const [loop, setLoop] = React.useState<any>('')

    React.useEffect(() => {
        const values = Object.values(posts) 

        const postLoop = values.map((post) => {
            return ( 
                <div key={post.id}>
                    <h1>{post.text}</h1>
                    <h5>por {post.username}</h5>
                </div>
            )
        })
        setLoop(postLoop)
    }, [posts])

    return (
        <div>
            <h1>Home</h1>
            <h2>Let's check some posts!</h2>
            {loop}
            <Link to='/login'>Login</Link>
        </div>
    )
}

export default Home;
