import React from 'react';

export default function Post(props) {
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
        <p className="card-block-text">{props?.content}</p>
      </div>
    </div>
  );
}
