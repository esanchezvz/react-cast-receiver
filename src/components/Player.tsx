import React, { useRef, useEffect, useState } from 'react';
import Plyr from 'plyr';
import { useCast } from '../contexts/cast.context';

const Player = ({ onReady }: { onReady: () => void }) => {
  const { provider, videoId, castMessage, castReady } = useCast();

  const playerRef = useRef<HTMLPlyrDivElement>(null);
  const [player, setPlayer] = useState<Plyr>();
  const playerLoaded = useRef(false);

  useEffect(() => {
    if (playerRef.current && castReady && !playerLoaded.current) {
      playerRef.current.setAttribute('data-plyr-provider', provider);
      playerRef.current.setAttribute('data-plyr-embed-id', videoId);

      const _player = new Plyr(playerRef.current, { seekTime: 10 });

      setPlayer(_player);
      playerLoaded.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [castReady]);

  useEffect(() => {
    if (player) {
      player.on('ready', () => {
        // player.fullscreen.enter();
        onReady();
        player.play();
      });
    }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player]);

  useEffect(() => {
    if (!player) return;

    if (castMessage.command === 'PLAY_VIDEO') {
      player.play();
    }
    if (castMessage.command === 'PAUSE_VIDEO') {
      player.pause();
    }
    if (castMessage.command === 'FORWARD') {
      player.forward();
    }
    if (castMessage.command === 'REWIND') {
      player.rewind();
    }
  }, [castMessage, player]);

  return (
    <>
      <div id='player' ref={playerRef} />
      <div
        style={{
          backgroundColor: 'white',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 501,
          color: 'black',
          padding: 20,
        }}
      >
        {!castReady && <p>Loading cast SDK...</p>}
        {!castReady && <p>Cast SDK loaded correctly.</p>}
        {castReady && !playerLoaded && (
          <p>Cast SDK loaded correctly + Loading video player...</p>
        )}
        {castReady && playerLoaded && (
          <p>Cast SDK loaded correctly + Player loaded correctly.</p>
        )}
      </div>
      {/* <div
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
        <pre>{JSON.stringify({ provider, videoId }, null, 2)}</pre>
      </div> */}
    </>
  );
};

type HTMLPlyrDivElement = HTMLDivElement & { plyr?: Plyr };

export default Player;
