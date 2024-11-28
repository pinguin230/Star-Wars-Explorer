import React, {createContext, useState, useContext, ReactNode} from 'react';

type SearchContextType = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  pagination: {currentPage: number, totalPages: number};
  setPagination: (query: any) => void;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({children}: { children: ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState<string>(null);

  const [pagination, setPagination] = useState<{ currentPage: number, totalPages: number }>({
    currentPage: 1,
    totalPages: 10
  })

  return (
      <SearchContext.Provider value={{searchQuery, setSearchQuery, pagination, setPagination}}>
        {children}
      </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
