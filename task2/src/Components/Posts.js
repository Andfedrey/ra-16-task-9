import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Post from './Post';

export default function Posts() {
  const [allPosts, setAllPosts] = useState([]);
  useEffect(() => {
    fetch('http://localhost:7777/posts')
      .then((res) => res.json())
      .then((data) => { setAllPosts(data); });
  }, []);
  return (
    <div>
      {allPosts && allPosts.map((post) => (
        <Link key={post.id} to={`/posts/${post.id}`} className="post-link">
          <Post content={post.content} />
        </Link>
      ))}
    </div>
  );
}
