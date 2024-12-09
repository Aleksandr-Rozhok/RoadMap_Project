import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/roadMapList.css";

const RoadmapList = () => {
  const [roadmaps, setRoadmaps] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoadmaps = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/roadmaps");
        if (!response.ok) {
          throw new Error("Failed to fetch roadmaps");
        }
        const data = await response.json();
        setRoadmaps(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchRoadmaps();
  }, []);

  const handleRoadmapClick = (id) => {
    navigate(`/roadmap/${id}`);
  };

  return (
    <div className="roadmap-list-container">
      <h1>Select a Roadmap</h1>
      <div className="roadmap-list">
        {roadmaps.map((roadmap) => (
          <div
            key={roadmap.id}
            className="roadmap-card"
            onClick={() => handleRoadmapClick(roadmap.id)}
          >
            <h2>{roadmap.title}</h2>
            <p>{roadmap.description}</p>
            <p>Progress: {roadmap.progress}%</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoadmapList;
