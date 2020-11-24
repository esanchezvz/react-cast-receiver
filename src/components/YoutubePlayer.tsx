import React, { useEffect, useRef } from 'react';
import { useYoutube } from '../contexts/youtube.context';

const YoutubePlayer = () => {
  const { player, debugMessage } = useYoutube();
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
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          width: '100%',
          zIndex: 500,
        }}
      >
        {JSON.stringify(
          { ...debugMessage, isMuted: player.isMuted() },
          null,
          2
        )}
      </div>
    </>
  );
};

export default YoutubePlayer;
