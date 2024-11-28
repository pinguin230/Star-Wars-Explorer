import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./pages/home/Home.tsx";
import ErrorPage from "./pages/error/ErrorPage.tsx";
import NotFoundPage from "./pages/not-found-page/NotFoundPage.tsx";
import {SearchProvider} from "./store/SearchContext.tsx";
import HeroDetails from "./pages/hero-details/HeroDetails.tsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: '/', element: <Home/>
      },
      {
        path: '/hero/:id', element: <HeroDetails/>
      },
      {path: '*', element: <NotFoundPage/>}
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    // <React.StrictMode>
    <SearchProvider>
      <RouterProvider router={router}/>
    </SearchProvider>
    // </React.StrictMode>,
)
