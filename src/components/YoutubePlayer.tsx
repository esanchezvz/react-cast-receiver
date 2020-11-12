import React, { useEffect, useRef } from 'react';
import { useYoutube } from '../contexts/youtube.context';

const YoutubePlayer = () => {
  const { player } = useYoutube();

  useEffect(() => {
    console.log({ player });
  }, [player]);

  return <div style={{ height: '100%', width: '100%' }} id={`playerDOM`} />;
};

export default YoutubePlayer;
