import React from 'react'
import AuthContext from '../../contexts/AuthContext'
import DBContext from '../../contexts/DBContext';
import {useNavigate} from 'react-router-dom'

function Posts() {
    const {posts, pages, setPosts} = React.useContext(DBContext)
    const {tokens} = React.useContext(AuthContext)

    const [loop, setLoop] = React.useState<Array<object>>([])
    const [paginate, setPaginate] = React.useState<Array<object>>([])

    const navigate = useNavigate()
    const POSTS_PER_PAGE: number = 10

    React.useEffect(() => {
        const values = Object.values(posts) 
        
        const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault()
            const button: HTMLButtonElement = e.currentTarget
    
            let response = await fetch(`/api/posts?page_num=${button.value}&page_size=${POSTS_PER_PAGE}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${tokens.access}`
                }
            })
            let data = await response.json()
            if (response.status === 200) {
                setPosts(data.data)
            }
        }

        const postLoop = values.map((post) => {
            return ( 
                <div onClick={() => navigate(`/posts/${post.id}`)} key={post.id}>
                    <h1>{post.text}</h1>
                    <h5>por {post.username}</h5>
                </div>
            )
        })
        setLoop(postLoop)

        const loadPages = (page: number) => {
            const pageNumbers: Array<number> = [];
    
            for (var i = 1; i <= page; i++) {
                if (!pageNumbers.includes(i)) {
                    pageNumbers.push(i)
                }
            }
    
            return pageNumbers.map(number => (
                <button key={number} value={number} onClick={handleClick}>
                    {number}
                </button>
            ))
        }

        setPaginate(loadPages(pages))
    }, [posts, navigate, pages, setPosts, tokens])

    return (
        <>
            {loop}
            {paginate}
        </>
    )
}

export default Posts;
