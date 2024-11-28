import "./styles/global.scss"
import { Outlet } from "react-router-dom";
import React, {FC} from "react";
import Header from "./layouts/header/Header.tsx";

const App:FC = () => (
    <>
      <div className="wrapper">
        <Header/>
        <div className="content">
          <div className="container">
            <Outlet/>
          </div>
        </div>
      </div>
    </>
);
export default App
