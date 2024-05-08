import React, { useState } from 'react';
import './HamburgerM.css'; // Import your CSS file for styling

export const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="hamburger-menu">
      <div className={`menu-icon ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <div className="menu-line"></div>
        <div className="menu-line"></div>
        <div className="menu-line"></div>
      </div>
      <dd className={`menu-items ${isOpen ? 'open' : ''}`}>
        <dt>Main Menu 1</dt>
        <dt>Main Menu 2
          <dd className="submenu">
            <dt>Sub Menu 1</dt>
            <dt>Sub Menu 2</dt>
            <dt>Sub Menu 3</dt>
          </dd>
        </dt>
        <dt>Main Menu 3</dt>
      </dd>
    </div>
  );
};
