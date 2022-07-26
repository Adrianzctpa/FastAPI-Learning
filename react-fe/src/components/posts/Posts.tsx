import React from 'react'
import AuthContext from '../../contexts/AuthContext'
import DBContext from '../../contexts/DBContext';
import {useNavigate} from 'react-router-dom'

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';


function Posts() {
    const {posts, pages, setPosts} = React.useContext(DBContext)
    const {tokens} = React.useContext(AuthContext)

    const [loop, setLoop] = React.useState<React.ReactNode>([])
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
            if (post.text.length > 100) {
                post.text = post.text.slice(0, 100) + '...'
            }

            return ( 
                <Container sx={{mb: '20px'}} maxWidth="sm" key={post.id}>
                    <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {post.title === '' ? 'No title yet' : (post.title)}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                BY {post.username}
                            </Typography>
                            <Typography variant="body2">
                                {post.text}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button onClick={() => navigate(`/posts/${post.id}`)} size="small">Check this post</Button>
                        </CardActions>
                    </Card>
                </Container>
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
                <Button sx={{marginRight: '10px'}} variant="contained" key={number} value={number} onClick={handleClick}>
                    {number}
                </Button>
            ))
        }

        if (pages > 1) {
            setPaginate(loadPages(pages))
        }
    }, [posts, navigate, pages, setPosts, tokens])

    return (
        <>
            {Object.values(posts).length === 0 ? <h1>No posts yet!</h1> : (
                <Container>
                    <>
                        <Typography variant="h4" sx={{textAlign: 'center'}} gutterBottom component="div">
                            Posts
                        </Typography>
                        {loop}
                        <Container sx={{display: 'flex', justifyContent: 'center'}}>
                            <>
                                {paginate}
                            </>
                        </Container>
                    </>
                </Container>
            )}
        </>
    )
}

export default Posts;
