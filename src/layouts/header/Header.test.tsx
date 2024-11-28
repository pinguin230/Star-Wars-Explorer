import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';  // Обов'язково, щоб маршрути працювали в тестах
import Header from './Header';

describe('Header', () => {
  test('renders the logo text', () => {
    render(
        <MemoryRouter>
          <Header />
        </MemoryRouter>
    );
    const logoElement = screen.getByText(/Star Wars Heroes/i);
    expect(logoElement).toBeInTheDocument();  // Перевіряємо, чи є логотип
  });

  test('renders the home link', () => {
    render(
        <MemoryRouter>
          <Header />
        </MemoryRouter>
    );
    const homeLink = screen.getByText(/Home/i);  // Шукаємо лінк по тексту
    expect(homeLink).toBeInTheDocument();  // Перевіряємо, чи є лінк на головну
  });

  test('navigates to home when clicking the home link', () => {
    render(
        <MemoryRouter initialEntries={['/']}>  // Початковий маршрут
          <Header />
        </MemoryRouter>
    );

    const homeLink = screen.getByText(/Home/i);
    fireEvent.click(homeLink);  // Імітуємо клік

    expect(window.location.pathname).toBe('/');  // Перевіряємо, що після кліку ми на головній сторінці
  });
});
