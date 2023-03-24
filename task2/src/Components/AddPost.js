import React from 'react';
import { Link } from 'react-router-dom';

export default function AddPost() {
  return (
    <div className="addpost">
      <Link to="/createPost" className="createpost">Создать пост</Link>
    </div>
  );
}
