import React from 'react'

interface Token {
    access: string,
    refresh: string
}

interface Props {
    tokens: Token,
    logstatus: boolean,
    login: (e: React.FormEvent<HTMLFormElement>) => void,
    logout: () => void,
    refresh: () => void
}

const AuthContext = React.createContext<Props>(null!)

export default AuthContext;

export const AuthProvider = ({children}: any) => {
    
    const [tokens, setTokens] = React.useState<any>(JSON.parse(localStorage.getItem('tokens')!))
    const [logstatus, setLogstatus] = React.useState<boolean>(() => localStorage.getItem('tokens') ? true : false)

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
        } else {
            console.log('error', data)
        }
    }

    const logout = async () => {
        localStorage.removeItem('tokens')
        setTokens('')
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
            window.location.reload()
        }
    }

    const context = {
        tokens: tokens,
        logstatus: logstatus,
        login: login,
        logout: logout,
        refresh: refreshTokens        
    }
    
    return (
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    )
}