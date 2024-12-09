import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import RoadmapList from "../components/RoadMapList";

import "../styles/roadMap.css";

const RoadMaps = () => {
  const [roadmap, setRoadmap] = useState(null);

  //if (!roadmap) return <div>Loading...</div>;

  return (
    <div className="roadmap-container">
      <Header />
      <div className="content-container">
        <RoadmapList />
      </div>
      <Footer />
    </div>
  );
};

export default RoadMaps;
