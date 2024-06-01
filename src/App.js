import React, { useState } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState('');

  const fetchProfileData = async () => {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) {
        throw new Error('User not found');
      }
      const data = await response.json();
      setProfileData(data);
      setError('');
    } catch (err) {
      setError(err.message);
      setProfileData(null);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
        />
        <button onClick={fetchProfileData}>Submit</button>
        {error && <p className="error">{error}</p>}
        {profileData && (
          <div className="profile-card">
            <img src={profileData.avatar_url} alt={profileData.name} />
            <h2>{profileData.name}</h2>
            <p>{profileData.bio}</p>
            <p><strong>Location:</strong> {profileData.location}</p>
            <p><strong>Public Repos:</strong> {profileData.public_repos}</p>
            <p><strong>Followers:</strong> {profileData.followers}</p>
            <p><strong>Following:</strong> {profileData.following}</p>
            <p><strong>Company:</strong> {profileData.company}</p>
            <p><strong>Blog:</strong> <a href={profileData.blog}>{profileData.blog}</a></p>
            <p><strong>Email:</strong> {profileData.email}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
