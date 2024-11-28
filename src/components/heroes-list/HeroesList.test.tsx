import '@testing-library/jest-dom';

import {render, screen, waitFor, fireEvent, act} from '@testing-library/react';
import HeroesList from './HeroesList';
import { getHeroes } from '../../api/starWarsApi';
import { BrowserRouter as Router } from 'react-router-dom';
import {SearchProvider} from '../../store/SearchContext';
import React from "react";

jest.mock('../../api/starWarsApi');

describe('HeroesList', () => {
  it('should render heroes after fetching', async () => {
    (getHeroes as jest.Mock).mockResolvedValue({
      results: [{ id: 1, name: 'Luke Skywalker' }],
      count: 1,
      total_pages: 1,
    });

    await act(async () => {
      render(
          <Router>
            <SearchProvider>
              <HeroesList/>
            </SearchProvider>
          </Router>
      );
    })
    await waitFor(() => expect(screen.getAllByTestId('skeleton-hero')).toHaveLength(10));

    await waitFor(() => screen.getByText('Luke Skywalker'));
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
  });

  it('should show error message when fetching fails', async () => {
    (getHeroes as jest.Mock).mockRejectedValue(new Error('Failed to fetch heroes'));

    await act(async () => {
      render(
          <Router>
            <SearchProvider>
              <HeroesList />
            </SearchProvider>
          </Router>
      )
    })

    await waitFor(() => screen.getByText('Failed to load heroes.'));
    expect(screen.getByText('Failed to load heroes.')).toBeInTheDocument();
  });
});
