import React from 'react'
import { useParams } from 'react-router-dom'
import AuthContext from '../../contexts/AuthContext';
import { Post } from '../../contexts/DBContext'; 
import PostOptions from './PostOptions';

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'

function SinglePost() {

    const { tokens, setLoading } = React.useContext(AuthContext)
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
            }  else {
                setLoading(true)
            }
        }

        postCheck()
    }, [id, tokens, info, setLoading])

    return (
        <div>
            {info.id === 0 ? <h1>404 - Not found</h1> : (
                <>
                    <Card>
                        <CardContent>
                                <Typography variant="h5" component="div">
                                    {info.title === '' ? 'No title yet' : (info.title)}
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    BY {info.username}
                                </Typography>
                                <Container sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                    <>
                                        <Typography id="user-edit-area" width='80%' variant="body2">
                                            {info.textHtml}
                                        </Typography>
                                        <PostOptions id={id} username={info.username} />
                                    </>
                                </Container>
                        </CardContent>
                    </Card>
                </>
            )}
        </div>
    )
}

export default SinglePost;