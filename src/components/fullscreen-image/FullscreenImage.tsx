import React from "react";
import "./FullscreenImage.scss";
import Popup from "../popup/Popup.tsx";

const FullscreenImage = ({imageURL, show, handleClose}) => {
  console.log("FullscreenImage");
  return (
      <>
        <Popup show={show} handleClose={handleClose}>
          <div className="fullscreen-image">
            <img src={imageURL} alt="Image"/>
          </div>
        </Popup>
      </>
  );
};

export default FullscreenImage;