import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {getHeroDetails} from "../../api/starWarsApi.ts";
import "./HeroDetails.scss";
import GraphView from "../../components/graph-view/GraphView.tsx";

const HeroDetails: React.FC = () => {
  const { id } = useParams<{id: string}>();
  const navigate = useNavigate();

  const [heroDetails, setHeroDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHeroDetails = async () => {
      setLoading(true);
      setError(null); // очищаємо попередні помилки
      try {
        const data = await getHeroDetails(id);
        setHeroDetails(data);
      } catch (err) {
        console.error("Error fetching hero details:", err);
        setError("Failed to load hero details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchHeroDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  const handleBackClick = () => {
    navigate("/");
  };

  return (
      <div className="hero-details-container">
        <div className="hero-details-name">
          <h1>{heroDetails.name}</h1>
        </div>
        <div className="hero-details-content">
          <div className="hero-details-image">
            <img
                src={`https://starwars-visualguide.com/assets/img/characters/${heroDetails.id}.jpg`}
                alt={heroDetails.name}
                className="hero-image"
            />
          </div>
          <div className="hero-details-info">
            <p><strong>Height:</strong> {heroDetails.height}</p>
            <p><strong>Mass:</strong> {heroDetails.mass}</p>
            <p><strong>Hair Color:</strong> {heroDetails.hair_color}</p>
            <p><strong>Skin Color:</strong> {heroDetails.skin_color}</p>
            <p><strong>Eye Color:</strong> {heroDetails.eye_color}</p>
            <p><strong>Birth Year:</strong> {heroDetails.birth_year}</p>
            <p><strong>Gender:</strong> {heroDetails.gender}</p>
          </div>
        </div>

        <div className="hero-graph-view">
          <GraphView hero={heroDetails} />
        </div>

        <div className="back-button">
          <button onClick={handleBackClick}>Back to Heroes</button>
        </div>
      </div>
  );
};

export default HeroDetails;
