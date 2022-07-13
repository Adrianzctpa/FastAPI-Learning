import React from 'react'
import AuthContext from './AuthContext'

interface Post {
    username: string,
    text: string,
    id: number
}

interface Props {
    posts: Array<Post>,
    username: string
}

const DBContext = React.createContext<Props>(null!)

export default DBContext;

export const DBProvider = ({children}: any) => {
    
    const { tokens, refresh }  = React.useContext(AuthContext)
    const [posts, setPosts] = React.useState<any>({})
    const [isLoading, setLoading] = React.useState<boolean>(true)
    const [username, setUsername] = React.useState<any>('')

    React.useEffect(() => {

        if (!isLoading) return

        async function getPosts() {
            if (!tokens) return

            let response = await fetch("/api/posts", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${tokens.access}`
                }
            })
        
            let data = await response.json()
            if (response.status === 200) {
                setPosts(data.data)
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
            if (response.status === 200) {
                setUsername(data.username)
            } else {
                refresh()
            }
        }
        
        getPosts()
        getUsername()

        if (isLoading) {
            setLoading(false)
        }
    }, [isLoading, tokens, refresh])
    
    const context = {
        posts: posts,
        username: username
    }
    
    return (
        <DBContext.Provider value={context}>
            {isLoading ? "Loading ..." : children}
        </DBContext.Provider>
    )
}
