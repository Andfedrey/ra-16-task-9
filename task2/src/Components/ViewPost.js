import React, {
  useEffect, useState,
} from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function ViewPost() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [check, setCheck] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`http://localhost:7777/posts/${postId}`)
      .then((res) => res.json())
      .then((data) => { setPost(data); });
  }, [postId]);

  const deleteHandle = async () => {
    const url = `http://localhost:7777/posts/${postId}`;
    const res = await fetch(url, {
      method: 'DELETE',
    });
    if (res.status === 204) {
      navigate('/');
    }
  };

  useEffect(() => {
    if (check) {
      return;
    }
    deleteHandle();
  }, [check]);

  return (
    <div>
      {
        post
        && (
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
              <p className="card-block-text">{post.content}</p>
            </div>
            <div className="card-buttons">
              <Link className="card-btn edit post-link" type="button" to={`/posts/${postId}/edit`}>Изменить</Link>
              <button className="card-btn delete-post" type="button" onClick={() => setCheck(false)}>Удалить</button>
            </div>
          </div>
        )
      }
    </div>
  );
}
