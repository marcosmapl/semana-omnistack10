import React from 'react';

import './styles.css';

function DeveloperItem({ dev }) {
  return (
    <li className="dev-item">
      <header>
        <img src={dev.avatar_url} alt={dev.name} />
        <div className="user-info">
          <strong>{dev.name}</strong>
          <span>{dev.techs.join(', ')}</span>
        </div>
      </header>
      <p>{dev.bio}</p>
      <a href={dev.html_url}>{dev.github_username}</a>
      <p>{dev.email}</p>
    </li>
  );
}

export default DeveloperItem;