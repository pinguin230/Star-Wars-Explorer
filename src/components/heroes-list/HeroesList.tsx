import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import {useSearch} from "../../store/SearchContext.tsx";
import {getHeroes, getHeroesByNameAndPage} from "../../api/starWarsApi.ts";
import Pagination from "../pagination/Pagination.tsx";
import HeroCard from "../hero-card/HeroCard.tsx";
import "./HeroesList.scss";
import FullscreenImage from "../fullscreen-image/FullscreenImage.tsx";
import {useNavigate} from "react-router-dom";
import SkeletonHero from "../hero-card/SkeletonHero.tsx";

interface Hero {
  id: number;
  name: string;
}

const HeroesList: FC = () => {
  const {searchQuery, pagination, setPagination} = useSearch();
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [fullscreenPopup, setFullscreenPopup] = useState(false)
  const [heroImageID, setHeroImageID] = useState<number>(0)
  const navigate = useNavigate();

  const fetchHeroes = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      let data;
      if (searchQuery) {
        data = await getHeroesByNameAndPage(searchQuery, pagination.currentPage);
      } else {
        data = await getHeroes(pagination.currentPage);
      }
      setHeroes(data.results);
      const totalPages = Math.ceil(data.count / 10); // округлення вгору
      setPagination(prevState => ({
        ...prevState,
        totalPages: totalPages
      }));
    } catch (error) {
      setError('Failed to load heroes.');
    } finally {
      setLoading(false);
    }
  }, [searchQuery, pagination.currentPage, setPagination]);

  useEffect(() => {
    fetchHeroes();
  }, [fetchHeroes]);

  const handleDetailsClick = (id: number) => {
    navigate(`/hero/${id}`);
  };

  const handleImageClick = (id: number) => {
    setHeroImageID(id)
    setFullscreenPopup(true)
  };

  const heroCards = heroes.map((hero) => (
      <div key={hero.id}>
        <HeroCard
            key={hero.id}
            name={hero.name}
            imageUrl={`https://starwars-visualguide.com/assets/img/characters/${hero.id}.jpg`}
            onDetailsClick={() => handleDetailsClick(hero.id)}
            onImageClick={() => handleImageClick(hero.id)}
        />
      </div>
  ))

  const skeletons = [...new Array(10)].map((_, index) => <SkeletonHero data-testid="skeleton-hero" key ={index}/>);

  return (
      <div className="heroes-list">
        <div className="heroes-grid">
          {error
              ? <h1>{error}</h1>
              : loading ? skeletons : heroCards}
          {fullscreenPopup && heroImageID !== null && (
              <FullscreenImage
                  imageURL={`https://starwars-visualguide.com/assets/img/characters/${heroImageID}.jpg`}
                  show={fullscreenPopup}
                  handleClose={() => setFullscreenPopup(false)}
              />
          )}
        </div>
        {heroes.length > 0 ? <Pagination /> : <p className="not-found-message">Not founded hero with that name</p>}
      </div>

  );
};

export default HeroesList;
