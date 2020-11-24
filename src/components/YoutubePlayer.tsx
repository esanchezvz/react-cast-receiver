import React, { useEffect, useRef } from 'react';
import { useYoutube } from '../contexts/youtube.context';

const YoutubePlayer = () => {
  const { player, debugMessage } = useYoutube();
  const playerInit = useRef(false);

  useEffect(() => {
    if (!playerInit.current && player) {
      player.playVideo();
      player.mute();
      setTimeout(() => {
        player.unMute();
      }, 2000);
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
          color: 'black',
          backgroundColor: 'white',
        }}
      >
        <pre>
          {JSON.stringify(
            { ...debugMessage, muted: player ? player.isMuted() : null },
            null,
            2
          )}
        </pre>
      </div>
    </>
  );
};

export default YoutubePlayer;
