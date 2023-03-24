import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';

export default function NewPost() {
  const [content, setContent] = useState('');
  const [clickSearch, setClickSearch] = useState(true);
  const navigate = useNavigate();
  const changeHandle = (e) => {
    setContent(e.target.value);
  };
  const fetchPost = async () => {
    const info = { content: content.trim(), id: nanoid() };
    if (clickSearch || !info.content) {
      return;
    }
    const url = 'http://localhost:7777/posts';
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(info),
    });

    if (res.status === 204) {
      setContent('');
      navigate('/');
    } else {
      console.log('error');
    }
  };

  const crossHandle = () => {
    navigate('/');
  };

  useEffect(() => {
    fetchPost();
  }, [clickSearch]);

  return (
    <div className="card-wrp add-post">
      <div className="card-info">
        <button type="button" className="card-cross" onClick={crossHandle}>x</button>
        <img
          src="https://avatars.githubusercontent.com/u/94897578?v=4"
          alt="#"
          className="card-info-img"
        />
        <input
          type="text"
          placeholder="Add comment..."
          className="card-input"
          onChange={changeHandle}
          value={content}
        />
      </div>
      <div className="addpost">
        <button
          type="button"
          className="createpost btn-new-post"
          onClick={() => {
            setClickSearch(false);
          }}
        >
          Опубликовать
        </button>
      </div>
    </div>
  );
}
