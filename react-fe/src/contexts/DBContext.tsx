import React from 'react'
import AuthContext from './AuthContext'

export interface Post {
    username: string,
    title: string,
    text: string,
    textHtml: string,
    id: number
}

export interface PostsObject {
    [key: number]: Post
}

interface Props {
    posts: PostsObject,
    userPosts: PostsObject,
    username: string,
    pages: number,
    userPages: number,
    setPosts: (posts: PostsObject) => void,
    setUserPosts: (posts: PostsObject) => void,
}

const DBContext = React.createContext<Props>(null!)

export default DBContext;

export const DBProvider = ({children}: {children: React.ReactNode}) => {
    
    const { tokens, loading, refresh, setLogstatus, setLoading }  = React.useContext(AuthContext)
    const [posts, setPosts] = React.useState<PostsObject>({})
    const [userPosts, setUserPosts] = React.useState<PostsObject>({})
    const [username, setUsername] = React.useState<string>('')
    const [pages, setPages] = React.useState<number>(0)
    const [userPages, setUserPages] = React.useState<number>(0)


    React.useEffect(() => {

        if (!loading) return 

        async function getPosts() {
            if (!tokens) return

            let response = await fetch("/api/posts", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${tokens.access}`
                }
            })
        
            let data = await response.json()
            if (response.status === 404) return

            if (response.status === 200) {
                setPosts(data.data)
                setPages(data.pages)
            } else {
                refresh()
            }
        }

        async function getUserPosts() {
            if (!tokens) return

            let response = await fetch("/api/user/posts", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${tokens.access}`
                }
            })
        
            let data = await response.json()
            if (response.status === 404) return

            if (response.status === 200) {
                setUserPosts(data.data)
                setUserPages(data.pages)
            } else {
                refresh()
            }
        }

        async function getUsername() {
            if (!tokens) return

            let response = await fetch("/api/user", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${tokens.access}`
                }
            })

            let data = await response.json()
            if (response.status === 404) return

            if (response.status === 200) {
                setUsername(data.username)
                setLogstatus(true)
            } else {
                refresh()
            }
        }
        
        getUsername()
        getPosts()
        getUserPosts()

        if (loading) {
            setLoading(false)
        }
    }, [loading, tokens, refresh, setLogstatus, setLoading])
    
    const context = {
        posts: posts,
        userPosts: userPosts,
        username: username,
        pages: pages,
        userPages: userPages,
        setPosts: setPosts,
        setUserPosts: setUserPosts,
    }
    
    return (
        <DBContext.Provider value={context}>
            {loading ? "Loading ..." : children}
        </DBContext.Provider>
    )
}
