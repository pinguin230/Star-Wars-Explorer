import axios from 'axios';

const BASE_URL = 'https://sw-api.starnavi.io';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

interface Hero {
  id: number;
  name: string;
}

interface HeroesResponse {
  results: Hero[];
  count: number;
  total_pages: number;
}

interface Film {
  id: number;
  title: string;
}

interface Vehicle {
  id: number;
  name: string;
}

interface FilmAndShipResponse {
  films: Film[];
  ships: Vehicle[];
}

type GetHeroes = (page: number) => Promise<HeroesResponse>;
type GetHeroesByNameProps = (search: string, page: number) => Promise<HeroesResponse>;

export const getHeroes: GetHeroes = async (page) => {
  try {
    const response = await api.get<HeroesResponse>('/people', {
      params: { page },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching heroes:', error);
    throw new Error('Failed to fetch heroes');
  }
}

export const getHeroesByNameAndPage: GetHeroesByNameProps = async (search, page) => {
  try {
    const response = await api.get<HeroesResponse>('/people', {
      params: {search, page}
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching heroes:', error);
    throw new Error('Failed to fetch heroes');
  }
}

export const getHeroDetails = async (heroId: string) => {
  try {
    const response = await api.get(`/people/${heroId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching hero details:', error);
    throw error;
  }
};

export const getFilmAndShipData = async (
    filmIds: number[],
    vehicleIds: number[]
): Promise<FilmAndShipResponse> => {
  try {
    const filmPromises = filmIds.map((id) =>
        api.get<Film>(`/films/${id}`).then((res) => res.data)
    );
    const shipPromises = vehicleIds.map((id) =>
        api.get<Vehicle>(`/vehicles/${id}`).then((res) => res.data)
    );

    const films = await Promise.all(filmPromises);
    const ships = await Promise.all(shipPromises);

    return { films, ships };
  } catch (error) {
    console.error('Error fetching films and ships:', error);
    throw new Error('Failed to fetch films and ships');
  }
};