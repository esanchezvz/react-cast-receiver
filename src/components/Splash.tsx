import React from 'react';

const Splash = ({ playerReady }: { playerReady: boolean }) => {
  return <div className={`splash ${playerReady ? 'splash__hide' : ''}`} />;
};

export default Splash;
