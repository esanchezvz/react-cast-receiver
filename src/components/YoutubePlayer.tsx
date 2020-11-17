import React, { useEffect, useRef } from 'react';
import { useYoutube } from '../contexts/youtube.context';

const YoutubePlayer = () => {
  const { player, event } = useYoutube();
  const playerInit = useRef(false);

  useEffect(() => {
    if (!playerInit.current && player) {
      player.playVideo();
      playerInit.current = true;
    }

    // console.log({ player });
  }, [player]);

  return (
    <>
      <div style={{ height: '100%', width: '100%' }} id={`playerDOM`} />
      <div
        style={{
          backgroundColor: 'white',
          position: 'absolute',
          bottom: 0,
          right: 0,
          padding: 20,
          zIndex: 2000,
          color: 'black',
        }}
      >
        {JSON.stringify(event.data, null, 2)}
      </div>
    </>
  );
};

export default YoutubePlayer;
