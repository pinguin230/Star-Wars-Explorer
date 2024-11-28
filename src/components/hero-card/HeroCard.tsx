import React from 'react';
import "./HeroCard.scss";

type HeroCardProps = {
  name: string;
  imageUrl: string;
  onDetailsClick: () => void;
  onImageClick: () => void;
};

const HeroCard: React.FC<HeroCardProps> = ({ name, imageUrl, onDetailsClick, onImageClick }) => {
  return (
      <div className="hero-card">
        <img src={imageUrl} alt={name} onClick={onImageClick} className="hero-image" />
        <div className="hero-name">{name}</div>
        <button className="details-button" onClick={onDetailsClick}>Details</button>
      </div>
  );
};

export default HeroCard;
