import React, { useState } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);

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

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
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
        <button onClick={toggleDarkMode}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
        {error && <p className="error">{error}</p>}
        {profileData && (
          <div className="profile-card">
            {profileData.avatar_url && <img id='avatarPicture' src={profileData.avatar_url} alt={profileData.name} />}
            {profileData.name && <h2 id='name'>{profileData.name}</h2>}
            {profileData.bio && <p>{profileData.bio}</p>}
            {profileData.location && <p><strong>Location:</strong> {profileData.location}</p>}
            {profileData.public_repos !== null && <p><strong>Public Repos:</strong> {profileData.public_repos}</p>}
            {profileData.followers !== null && <p><strong>Followers:</strong> {profileData.followers}</p>}
            {profileData.following !== null && <p><strong>Following:</strong> {profileData.following}</p>}
            {profileData.company && <p><strong>Company:</strong> {profileData.company}</p>}
            {profileData.blog && <p id='blogLink'><strong>Blog:</strong> <a href={profileData.blog}>{profileData.blog}</a></p>}
            {profileData.email && <p id='emailLink'><strong>Email:</strong> {profileData.email}</p>}
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
