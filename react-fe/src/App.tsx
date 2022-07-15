import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes} from "react-router-dom"
import AuthContext from './contexts/AuthContext'

import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'

import Posts from './components/posts/Posts'
import CreatePosts from './components/posts/CreatePosts'
import SinglePost from './components/posts/SinglePost'


function App() {
  
  const { logstatus } = React.useContext(AuthContext)

  return (
    <Router>
      <Routes>
        <Route path='' element={<Home />} />
        <Route path="login/" element={<Login />} />
        
        {!logstatus ? <Route path="register/" element={<Register />} /> : (
          <>
            <Route path="posts/" element={<Posts />} />
            <Route path="posts/create/" element={<CreatePosts />} />
            <Route path="posts/:id/" element={<SinglePost />}/>
          </>
        )}

      </Routes>
    </Router>
  );
}

export default App;
