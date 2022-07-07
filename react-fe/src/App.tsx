import React from 'react'
import PostContext from './contexts/PostContext';

function App() {
  
  const context = React.useContext(PostContext)

  return (
    <div className="App">
      {context.posts.map((obj) => <h1 key={obj.id}>{obj.text}</h1>)}
    </div>
  );
}

export default App;
