import React from 'react'

interface Post {
    text: string,
    id: number
}

interface Props {
    posts: Array<Post>
}

const PostContext = React.createContext<Props>(null!)

export default PostContext;

export const PostProvider = ({children}: any) => {
    
    const [posts, setPosts] = React.useState<any>('')
    const [isLoading, setLoading] = React.useState<boolean>(true)

    React.useEffect(() => {
        async function fetchData() {
            let response = await fetch("/api/getposts")
            let data = await response.json()
        
            setPosts(data)

            if (isLoading) {
                setLoading(false)
            }
        }

        fetchData()
    }, [isLoading])
    
    const context = {
        posts: posts
    }
    
    return (
        <PostContext.Provider value={context}>
            {isLoading ? "Loading ..." : children}
        </PostContext.Provider>
    )
}
