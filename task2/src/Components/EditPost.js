import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditPost() {
  const { postId } = useParams();
  const [post, setPost] = useState();
  const [newPost, setNewPost] = useState({ content: post?.content });
  const [check, setCheck] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`http://localhost:7777/posts/${postId}`)
      .then((res) => res.json())
      .then((data) => { setPost(data); });
  }, [postId]);

  const changeHandle = (e) => {
    setNewPost(() => ({ content: e.target.value }));
  };

  const editHandle = async () => {
    const url = `http://localhost:7777/posts/${postId}`;
    const res = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPost),
    });
    if (res.status === 204) {
      console.log('ok');
      navigate('/');
    }
  };

  useEffect(() => {
    if (check) {
      return;
    }
    editHandle();
  }, [check]);

  return (
    <div className="card-wrp">
      <div className="card-info">
        <img
          src="https://avatars.githubusercontent.com/u/94897578?v=4"
          alt="#"
          className="card-info-img"
        />
        <div className="card-info-user">
          <h6 className="card-info-user-name">Andrey Fedorov</h6>
          <p className="card-info-user-about">info about user</p>
        </div>
      </div>
      <div className="card-block">
        <input
          type="text"
          placeholder={post?.content}
          className="card-input"
          onChange={changeHandle}
          value={newPost.content}
        />
        <button type="button" onClick={() => setCheck(false)}>ok</button>
      </div>
    </div>
  );
}
