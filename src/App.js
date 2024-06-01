import './App.css';
import { useState } from 'react';
import * as d3 from 'd3';

function App() {
  const [githubName, setGithubName] = useState("");
  const [data, setData] = useState(null);

  const handleChange = (e) => {
    setGithubName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (githubName) {
      fetch(`https://api.github.com/users/${githubName}`)
        .then(response => response.json())
        .then(data => {
          setData(data);
          drawVisualization(data);
        })
        .catch(error => console.error('Error fetching the GitHub data:', error));
    }
  };

  const drawVisualization = (data) => {
    d3.selectAll("#visualization > *").remove();
    const svg = d3.select("#visualization")
      .append("svg")
      .attr("width", 300)
      .attr("height", 300);

    const circle = svg.append("circle")
      .attr("cx", 150)
      .attr("cy", 150)
      .attr("r", data.public_repos)
      .attr("fill", "blue");

    svg.append("text")
      .attr("x", 150)
      .attr("y", 150)
      .attr("text-anchor", "middle")
      .attr("dy", ".3em")
      .attr("fill", "white")
      .text(data.public_repos);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Gitcard - Turn your GitHub profile into a business card!</h1>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Enter your GitHub username" 
            value={githubName} 
            onChange={handleChange}
          />
          <button type="submit">Submit</button>
        </form>
        {data && (
          <div className="Card">
            <h2>{data.name}</h2>
            <img src={data.avatar_url} alt={`${data.name}'s avatar`} width="100" />
            <p><strong>Username:</strong> {data.login}</p>
            <p><strong>Bio:</strong> {data.bio}</p>
            <p><strong>Location:</strong> {data.location}</p>
            <p><strong>Public Repos:</strong> {data.public_repos}</p>
            <p><strong>Followers:</strong> {data.followers}</p>
            <p><strong>Following:</strong> {data.following}</p>
            <div id="visualization"></div>
          </div>
        )}

        <div className="Repo">

          
        </div>
      </header>
    </div>
  );
}

export default App;
