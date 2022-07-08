import { Link } from 'react-router-dom'

function Login() {
    return (
        <div>
            <h1>Login</h1>

            <form>
                <label>Username</label>
                <input type='username' id='username' />

                <label>Password</label>
                <input type='password' id='password' />

                <button type='submit'>Submit</button>
            </form>

            <Link to='/'>Go back</Link>
        </div>
    )
}

export default Login;
