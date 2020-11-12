import React from 'react';
import './styles.css';

const Header: React.FC = () => {
  // Temporary.
  const handlePress = () => {
    // eslint-disable-next-line no-alert
    alert('testing');
  };

  return (
    <div className="header">
      <span className="header-label">Many Voices CMS</span>
      <div className="header-button-section">
        <div
          className="header-button"
          role="button"
          tabIndex={0}
          onKeyPress={() => handlePress()}
          onClick={() => handlePress()}>
          Settings
        </div>
        <div
          className="header-button"
          role="button"
          tabIndex={0}
          onKeyPress={() => handlePress()}
          onClick={() => handlePress()}>
          Sign Out
        </div>
      </div>
    </div>
  );
};

export default Header;
