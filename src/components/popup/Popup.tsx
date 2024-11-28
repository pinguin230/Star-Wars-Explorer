import React, { useEffect, useRef } from 'react';
import "./Popup.scss";

interface PopupProps {
  show: boolean;
  handleClose: () => void;
  children: React.ReactNode;
}

const Popup: React.FC<PopupProps> = ({ show, handleClose, children}) => {
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show, handleClose]);

  return (
      show ? (
          <div className={`popup`}>
            <div className="popup-inner" ref={popupRef}>
              {children}
            </div>
          </div>
      ) : null
  );
};

export default Popup;
