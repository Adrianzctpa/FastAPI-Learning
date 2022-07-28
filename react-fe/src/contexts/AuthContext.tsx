import React from 'react'

type Token = {
    access: string,
    refresh: string
}

interface Props {
    tokens: Token,
    logstatus: boolean,
    login: (e: React.FormEvent<HTMLFormElement>) => void,
    logout: () => void,
    refresh: () => void,
    setLogstatus: (logstatus: boolean) => void,
    loading: boolean,
    setLoading: (loading: boolean) => void
}

const AuthContext = React.createContext<Props>(null!)

export default AuthContext;

export const AuthProvider = ({ children }: {children: React.ReactNode}) => {
    
    const [tokens, setTokens] = React.useState<Token>(JSON.parse(localStorage.getItem('tokens')!))
    const [logstatus, setLogstatus] = React.useState<boolean>(false)
    const [loading, setLoading] = React.useState<boolean>(true)

    const login = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let response = await fetch('/api/user/login', {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                'username': e.currentTarget.username.value,
                'password': e.currentTarget.password.value
            })
        })
        let data = await response.json()

        if (response.status === 200) {
            localStorage.setItem('tokens', JSON.stringify({'access': data.access, 'refresh': data.refresh}))
            setTokens({'access': data.access, 'refresh': data.refresh})
            setLogstatus(true)
            setLoading(true)
        }
    }

    const logout = async () => {
        localStorage.removeItem('tokens')
        setTokens({'access': '', 'refresh': ''})
        setLogstatus(false)
    }

    const refreshTokens = async () => {
        let response = await fetch('/api/token/refresh', { 
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${tokens.refresh}`
            }
        })
        let data = await response.json()

        if (response.status === 200) {
            localStorage.setItem('tokens', JSON.stringify({'access': data.access, 'refresh': data.refresh}))
            setTokens({'access': data.access, 'refresh': data.refresh})
            setLogstatus(true)
            setLoading(true)
        } else {
            setLogstatus(false)
        }
    }

    const context = {
        tokens: tokens,
        logstatus: logstatus,
        loading: loading,
        login: login,
        logout: logout,
        refresh: refreshTokens,
        setLogstatus: setLogstatus,
        setLoading: setLoading,        
    }
    
    return (
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    )
}