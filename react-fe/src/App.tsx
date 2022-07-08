import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes} from "react-router-dom"
import Home from './components/Home'
import Login from './components/Login'

import PostContext from './contexts/PostContext';

function App() {
  
  const context = React.useContext(PostContext)
  console.log(context)

  return (
    <Router>
      <Routes>
        <Route path='' element={<Home />} />
        <Route path="login/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
