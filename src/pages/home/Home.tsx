import { FC } from 'react';
import SearchBar from "../../components/search-bar/SearchBar.tsx";
import HeroesList from "../../components/heroes-list/HeroesList.tsx";
import './Home.scss';

const Home: FC = () => {
  return (
      <div className="home">
        <SearchBar />
        <main className="home__main">
          <h1 className="home__title">Star Wars Heroes</h1>
          <div className="home__heroes-list">
            <HeroesList />
          </div>
        </main>
      </div>
  );
};

export default Home;
