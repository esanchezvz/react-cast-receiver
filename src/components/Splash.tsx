import React from 'react';
import { useYoutube } from '../contexts/youtube.context';

const Splash = () => {
  const { apiReady } = useYoutube();

  return <div className={`splash ${apiReady ? 'splash__hide' : ''}`} />;
};

export default Splash;
