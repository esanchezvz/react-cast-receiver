import React, { useRef, useState, useEffect } from 'react';
import Player from '@vimeo/player';

import { useCast } from '../contexts/cast.context';

const VimeoPlayer = ({ handleSplash }: { handleSplash: () => void }) => {
  const { videoId, castMessage } = useCast();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerInitRef = useRef(false);
  const loadedRef = useRef(false);
  const [player, setPlayer] = useState<Player | null>(null);

  useEffect(() => {
    let player: Player;
    if (iframeRef.current) {
      player = new Player(iframeRef.current, {
        autoplay: true,
      });
      setPlayer(player);
      playerInitRef.current = true;
    }

    return () => {
      player.destroy();
    };
  }, []);

  useEffect(() => {
    const handler = async () => {
      if (!playerInitRef.current || !player) return;

      if (castMessage.command === 'PLAY_VIDEO') {
        await player.play();
      }
      if (castMessage.command === 'PAUSE_VIDEO') {
        await player.pause();
      }
      if (castMessage.command === 'FORWARD') {
        const time = await player.getCurrentTime();
        await player.setCurrentTime(time + 10);
      }
      if (castMessage.command === 'REWIND') {
        const time = await player.getCurrentTime();
        await player.setCurrentTime(time >= 10 ? time - 10 : 0);
      }
    };

    handler();
  }, [castMessage, player]);

  useEffect(() => {
    if (player && !loadedRef.current) {
      const _requestFullscrren = async () => {
        await (player as any).requestFullscreen();
      };

      player.on('loaded', async (e) => {
        loadedRef.current = true;
        handleSplash();
        // await player.play();
        await _requestFullscrren();
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player]);

  return (
    <iframe
      ref={iframeRef}
      title='vimeo player'
      src={`https://player.vimeo.com/video/${videoId}`}
      width='100%'
      height='100%'
      frameBorder='0'
      allowFullScreen
      allow='autoplay'
    />
  );
};

export default VimeoPlayer;
