import React from 'react';
// import { useYoutube } from '../contexts/youtube.context';

const Splash = ({ playerReady }: { playerReady: boolean }) => {
  // const { apiReady } = useYoutube();

  return <div className={`splash ${playerReady ? 'splash__hide' : ''}`} />;
};

export default Splash;
