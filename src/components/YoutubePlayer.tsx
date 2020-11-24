import React, { useEffect, useRef } from 'react';
import { useYoutube } from '../contexts/youtube.context';

const YoutubePlayer = () => {
  const { player, castMessage } = useYoutube();
  const playerInit = useRef(false);

  useEffect(() => {
    if (!playerInit.current && player) {
      player.playVideo();
      playerInit.current = true;
    }

    // console.log({ player });
  }, [player]);

  useEffect(() => {
    if (castMessage.command === 'MUTE_VIDEO') {
      player.mute();
    }
    if (castMessage.command === 'UNMUTE_VIDEO') {
      player.unMute();
    }
  }, [castMessage, player]);

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
        <pre>{JSON.stringify({ ...castMessage }, null, 2)}</pre>
      </div>
    </>
  );
};

export default YoutubePlayer;
