import React from 'react'
import AuthContext from '../../contexts/AuthContext'
import DBContext from '../../contexts/DBContext';
import {useNavigate} from 'react-router-dom'

import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'

import styled from 'styled-components'

function Posts() {
    const {posts, pages, setPosts} = React.useContext(DBContext)
    const {tokens} = React.useContext(AuthContext)

    const [loop, setLoop] = React.useState<React.ReactNode>([])
    const [paginate, setPaginate] = React.useState<Array<object>>([])

    const navigate = useNavigate()
    const POSTS_PER_PAGE: number = 10

    React.useEffect(() => {
        const values = Object.values(posts) 

        const HoverPost = styled(ListItem)`
            cursor: pointer;
        `;
        
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
            if (post.text.length > 100) {
                post.text = post.text.slice(0, 100) + '...'
            }

            return ( 
                <div key={post.id}>
                    <HoverPost onClick={() => navigate(`/posts/${post.id}`)}>
                        <ListItemText primary={post.username} secondary={post.text} />
                    </HoverPost>
                    <Divider variant="inset" component="li" />
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
            <List sx={{
                width:'100%',
                maxWidth: 360,
                bgcolor: 'background.papeer'
            }}>
                {loop}
            </List>
            {paginate}
        </>
    )
}

export default Posts;
