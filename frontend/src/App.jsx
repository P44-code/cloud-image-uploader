import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostFeed from './pages/PostFeed';
import CreatePost from './pages/CreatePost'; // Check karo spelling aur capital letters

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={< CreatePost />} />
        <Route path="/PostFeed" element={<PostFeed />} />
      </Routes>
    </Router>
  );
}

export default App;
