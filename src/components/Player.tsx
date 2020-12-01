import React, { useRef, useEffect, useState } from 'react';
import Plyr, { Options } from 'plyr';
import { useCast } from '../contexts/cast.context';

const Player = () => {
  const { provider, videoId } = useCast();

  const playerRef = useRef<HTMLPlyrVideoElement>(null);
  const [player, setPlayer] = useState<Plyr>();

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.setAttribute('data-plyr-provider', provider);
      playerRef.current.setAttribute('data-plyr-embed-id', videoId);

      const _player = new Plyr(playerRef.current, {});

      setPlayer(_player);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (player) {
      player.on('ready', () => {
        player.fullscreen.enter();
        player.play();

        console.log(player.fullscreen.enabled);
      });
    }
  }, [player]);

  return <div id='player' ref={playerRef} />;
};

type HTMLPlyrVideoElement = HTMLDivElement & { plyr?: Plyr };

export default Player;
